import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged, signOut, User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import {FirestoreService} from './../../servicios/firestore.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule],
  styleUrls: ['./navbar.component.css'],
  standalone: true,
})
export class NavbarComponent implements OnInit {
  usuarioLogueado: User | null = null;
  rutaActual : string = "";
  load! : Promise <boolean>;
  rol : string = "";

  constructor(private firestoreService : FirestoreService,private auth: Auth, private router: Router) {}
  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      this.usuarioLogueado = user;
      this.rutaActual = this.router.url;
  
      if (user?.uid) {
        try {
          const usuarioInfo = await this.firestoreService.getUsuarioInfo(user.uid);
          
          if (usuarioInfo?.rol) {
            this.rol = usuarioInfo.rol;
            console.log("Rol del usuario:", this.rol);
          } else {
            console.warn("El usuario no tiene un rol definido en Firestore.");
          }
        } catch (error) {
          console.error("Error al obtener la información del usuario:", error);
        }
      } else {
        console.log("No hay un usuario logueado.");
      }
  
      this.load = Promise.resolve(true); 
    });
  }
  seccionUsuarios() {
    this.router.navigate(['/seccionUsuarios']);
  }
  
  home() {
    this.router.navigate(['/home']);
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
