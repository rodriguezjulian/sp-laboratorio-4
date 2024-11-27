import { Injectable } from '@angular/core';
import { DocumentSnapshot, Firestore, QuerySnapshot, collection, 
  collectionGroup, deleteDoc, doc, getDoc, getDocs, serverTimestamp, where, query,
  setDoc, updateDoc} from '@angular/fire/firestore';
import {  onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

  
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }
  
  //---| CREATE |---//
  async createDocument<tipo>(path: string, data: tipo, id: string | null = null) {
    let refDoc;
    if (id) {
      refDoc = doc(this.firestore, `${path}/${id}`);
    } else {
      const refCollection = collection(this.firestore, path)
      refDoc = doc(refCollection);
    }
    const dataDoc: any = data;
    dataDoc.id = refDoc.id;
    dataDoc.creado = serverTimestamp();
    await setDoc(refDoc, dataDoc);
    return dataDoc.id;
  }
  //----------------//


  //---| UPDATE |---//
  async updateDocument(path: string, data: any) {
    const refDoc = doc(this.firestore, path);
    return await updateDoc(refDoc, data);
  }
  //----------------//


  //---| DELETE |---//
  async deleteDocument(path: string) {
    const refDoc = doc(this.firestore, path);
    return await deleteDoc(refDoc);
  }
  //----------------// 


  //---| READ |---//
  async getDocument<tipo>(path: string) {
    const refDocument = doc(this.firestore, path);
    return await getDoc(refDocument) as DocumentSnapshot<tipo> ;    
  }


  async getDocuments<tipo>(path: string, group: boolean = false) {
    if (!group) {
      const refCollection = collection(this.firestore, path);
      return await getDocs(refCollection) as QuerySnapshot<tipo> ;    
    } else  {
      const refCollectionGroup = collectionGroup(this.firestore, path)
      return await getDocs(refCollectionGroup) as QuerySnapshot<tipo>;
    }
  }

  async getUsuarioInfo(uid: string) {
    const colecciones = ['administrador', 'especialista', 'paciente'];
    
    for (const coleccion of colecciones) {
      try {
        const userDoc = await this.getDocument<any>(`${coleccion}/${uid}`);
        if (userDoc.exists()) {
          return { ...userDoc.data(), coleccion }; // Retorna la información del usuario y la colección donde se encontró
        }
      } catch (error) {
        console.log("Usuario no encontrado en la colección");
      }
    }
    throw new Error(`Usuario con UID ${uid} no encontrado en ninguna colección.`);
  }
  async getAdministradores() {
    try {
      const adminDocs = await this.getDocuments<any>('administrador');
      return adminDocs.docs.map(doc => doc.data()); // Retorna un array con todos los administradores
    } catch (error) {
      console.error("Error al obtener la colección de administradores:", error);
      throw error;
    }
  }
  
  async getEspecialistas() {
    try {
      const especialistaDocs = await this.getDocuments<any>('especialista');
      return especialistaDocs.docs.map(doc => doc.data()); // Retorna un array con todos los especialistas
    } catch (error) {
      console.error("Error al obtener la colección de especialistas:", error);
      throw error;
    }
  }
  
  async getPacientes() {
    try {
      const pacienteDocs = await this.getDocuments<any>('paciente');
      return pacienteDocs.docs.map(doc => doc.data()); // Retorna un array con todos los pacientes
    } catch (error) {
      console.error("Error al obtener la colección de pacientes:", error);
      throw error;
    }
  }
  
  async getUsuarios() {
    const snapshot = await this.getDocuments<any>('usuarios');
    return snapshot.docs.map(doc => doc.data());
  }

  async getDocumentsByField<tipo>(collectionPath: string, fieldName: string, value: any): Promise<tipo[]> {
    const collectionRef = collection(this.firestore, collectionPath);
    const q = query(collectionRef, where(fieldName, "==", value));
    
    const querySnapshot: QuerySnapshot = await getDocs(q);
    const documents: tipo[] = querySnapshot.docs.map(doc => doc.data() as tipo);
    
    return documents;
  }

  async getTokenByUid(uid: string) {
    const doc: any = await this.getDocument(`usuarios/${uid}`);

    return doc.data().token;
  }
  
  async getEspecialidades() {
    const snapshot = await this.getDocuments<any>('especialidades');
    return snapshot.docs.map(doc => doc.data());
  }
}
