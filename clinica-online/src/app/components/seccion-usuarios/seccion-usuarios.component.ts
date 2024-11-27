import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss'],
  imports : [CommonModule],
  standalone : true
})
export class SeccionUsuariosComponent {
  pacientes: any[] = [];
  especialistas: any[] = [];
  administradores: any[] = [];
  constructor(private router: Router,private firestoreService: FirestoreService) {}

  navigateTo(userType: string): void {
    switch (userType) {
      case 'paciente':
        this.router.navigate(['/registroPaciente']);
        break;
      case 'especialista':
        this.router.navigate(['/registroEspecialista']);
        break;
      case 'admin':
        this.router.navigate(['/registroAdmin']);
        break;
      default:
        console.error('Ruta no definida para:', userType);
    }
  }
  ngOnInit(): void {
    this.loadUsers();
  }
  async toggleHabilitado(especialista: any) {
    especialista.habilitado = !especialista.habilitado;
    try {
      await this.firestoreService.updateDocument(`especialista/${especialista.id}`, {
        habilitado: especialista.habilitado,
      });
      console.log('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  }
  async loadUsers() {
    try {
      this.pacientes = await this.firestoreService.getPacientes();
      this.especialistas = await this.firestoreService.getEspecialistas();
      this.administradores = await this.firestoreService.getAdministradores();
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }
}
