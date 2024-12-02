import { Injectable } from '@angular/core';
import { DocumentSnapshot, Firestore, QuerySnapshot, collection, QueryConstraint,
  collectionGroup, deleteDoc, doc, getDoc, getDocs, serverTimestamp, where, query,CollectionReference ,
  setDoc, updateDoc} from '@angular/fire/firestore';
import {  onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

  
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {this.turnosCollection = collection(this.firestore, 'turnos'); }
  private turnosCollection: CollectionReference;
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
  async getCollection(
    collectionName: string,
    queryOptions?: { where: Array<{ field: string; op: string; value: any }> }
  ) {
    // Obtén la referencia a la colección
    const collectionRef = collection(this.firestore, collectionName);
  
    // Construye las condiciones de la consulta
    let constraints: QueryConstraint[] = [];
    if (queryOptions && queryOptions.where) {
      constraints = queryOptions.where.map((condition) =>
        where(condition.field, condition.op as any, condition.value)
      );
    }
  
    // Crea la consulta
    const q = query(collectionRef, ...constraints);
  
    // Ejecuta la consulta y retorna los documentos
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  

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
  async getTurnos(options?: { where?: { field: string; op: any; value: any }[] }): Promise<any[]> {
    try {
      // Construcción de la consulta
      let turnosQuery = this.turnosCollection;

      if (options?.where) {
        let q = query(turnosQuery);
        options.where.forEach((filter) => {
          q = query(q, where(filter.field, filter.op, filter.value));
        });
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }

      // Si no hay filtros, obtener todos los turnos
      const querySnapshot = await getDocs(turnosQuery);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener turnos:', error);
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

  async getEspecialistaByCorreo(correo: string) {
    const especialistas = await this.getDocumentsByField<any>('especialista', 'correo', correo);
    return especialistas.length > 0 ? especialistas[0] : null;
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
