import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Auth, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut,UserCredential  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private firestoreService: FirestoreService, private auth: Auth) {
    this.auth.languageCode = 'es';    
  }

  async createUser(coleccion : string, clienteData: any, email: string, password: string) {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await sendEmailVerification(userCredential.user);
      const clienteId = await this.firestoreService.createDocument(coleccion, { ...clienteData }, userCredential.user.uid);
      console.log('Cliente agregado a Firestore con ID:', clienteId);
      return userCredential;
    } catch (error) {
      console.error('Error al crear usuario o agregarlo a Firestore:', error);
      throw error;
    }
  }
  getCurrentUser() {
    return this.auth.currentUser
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(reload = true) {
    await signOut(this.auth);
  }
}
