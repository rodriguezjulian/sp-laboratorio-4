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
  nombreUsuario : string = "";


  constructor(private firestoreService : FirestoreService,private auth: Auth, private router: Router) {}
  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      this.usuarioLogueado = user;
      this.rutaActual = this.router.url;
  
      if (user?.uid) {
        try {
          const usuarioInfo = await this.firestoreService.getUsuarioInfo(user.uid);
          this.nombreUsuario = usuarioInfo?.nombre + usuarioInfo?.apellido;
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
  turnos() {
    this.router.navigate(['/turnos']);
  }
  crearTurno() {
    this.router.navigate(['/crear-turno']);
  }
  
  
  turnosAsignados() {
    this.router.navigate(['/misturnos-e']);
  }

  perfilEspecialista() {
    this.router.navigate(['/perfilEspecialista']);
  }
  home() {
    this.router.navigate(['/home']);
  }
  mostrarEspecialistas() {
    this.router.navigate(['/solicitar-turno']);
  }
  misTurnos() {
    this.router.navigate(['/mis-turnos']);
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  } 
  redireccion(ruta : string)
  {
    this.router.navigate([ruta]);
  }
  cerrarSesion() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
