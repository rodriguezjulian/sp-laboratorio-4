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
  
  async getPedidoByUid(uid: string) {
    try {
      // Llamar a getDocument para obtener el snapshot del documento
      const docSnapshot = await this.getDocument(`listaPedidos/${uid}`);
  
      // Verificar si el documento existe
      if (!docSnapshot.exists()) {
        throw new Error('No se encontró el pedido con el uid proporcionado');
      }
  
      // Devolver los datos del documento
      return docSnapshot.data(); // Acceder a los datos del documento
    } catch (error) {
      console.error('Error al obtener el pedido:', error);
      throw error; // Manejar el error según sea necesario
    }
  }
  async getEspecialidades() {
    const snapshot = await this.getDocuments<any>('especialidades');
    return snapshot.docs.map(doc => doc.data());
  }
}
