import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Auth, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut,UserCredential  } from '@angular/fire/auth';
import {  User, onAuthStateChanged} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogueado: User | null = null;
  constructor(private firestoreService: FirestoreService, private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.usuarioLogueado = user;
      console.log('Estado del usuario cambiado:', this.usuarioLogueado);
    });
    this.auth.languageCode = 'es';    
  }

  async createUser(coleccion : string, clienteData: any, email: string, password: string, adminEmail? : string, adminPassword? : string) {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await sendEmailVerification(userCredential.user);
      const clienteId = await this.firestoreService.createDocument(coleccion, { ...clienteData }, userCredential.user.uid);
      console.log('Cliente agregado a Firestore con ID:', clienteId);

      console.log('Sesión cerrada para el usuario recién creado');
      await signOut(this.auth);
      //En caso de haber estado logueado como admin, inicio sesion nuevamente
      if(adminEmail!=null && adminPassword!=null)await signInWithEmailAndPassword(this.auth, adminEmail, adminPassword);

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
    console.log("estoy en el login");
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  obtenerUsuarioActual(): User | null {
    return this.usuarioLogueado;
  }
  /*async logout(reload = true) {
    await signOut(this.auth);
  }*/
    async logout() {
      await this.auth.signOut();
      this.usuarioLogueado = null;
    }
}
