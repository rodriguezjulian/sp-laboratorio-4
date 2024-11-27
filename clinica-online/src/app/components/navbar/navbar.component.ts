import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged, signOut, User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.usuarioLogueado = user;
      this.rutaActual = this.router.url;
    });
  }


  home() {
    this.router.navigate(['/home']);
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    const currentRoute = this.router.url;

    if (currentRoute === '/terminos') {
      // Mostrar SweetAlert si el usuario está en "terminos"
      Swal.fire({
        icon: 'warning',
        title: 'No puedes cerrar sesión',
        text: 'Para cerrar sesión primero debes aceptar los términos y condiciones.',
        confirmButtonText: 'Entendido',
      });
      return; // Bloquear la acción de cerrar sesión
    }

    // Si no está en "terminos", cerrar sesión normalmente
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
