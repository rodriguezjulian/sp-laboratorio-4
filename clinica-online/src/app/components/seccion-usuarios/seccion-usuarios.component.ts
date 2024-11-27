import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss'],
  standalone : true
})
export class SeccionUsuariosComponent {
  constructor(private router: Router) {}

  navigateTo(userType: string): void {
    switch (userType) {
      case 'paciente':
        this.router.navigate(['/registro-paciente']);
        break;
      case 'especialista':
        this.router.navigate(['/registro-especialista']);
        break;
      case 'admin':
        this.router.navigate(['/registro-admin']);
        break;
      default:
        console.error('Ruta no definida para:', userType);
    }
  }
}
