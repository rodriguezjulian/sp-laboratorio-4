import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { EstadoTurnoColorDirective } from '../../directivas/estado-turno-color.directive';
import { BuscarEspecialistaEspecialidadPipe } from '../../pipe/buscar-especialista-especialidad.pipe';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,EstadoTurnoColorDirective,BuscarEspecialistaEspecialidadPipe],
})
export class MisTurnosComponent implements OnInit {
  usuarioLogueado: User | null = null;
  BuscarEspecialistaEspecialidad: string = ''; // Input de búsqueda
  turnos: any[] = [];
  especialidadFiltro: string = '';
  especialistaFiltro: string = '';
  estadosTurnos: { [key: string]: string } = {
    pendiente: 'Pendiente',
    cancelado: 'Cancelado',
    realizado: 'Realizado',
    rechazado: 'Rechazado',
  };

  constructor(private firestoreService: FirestoreService, private auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        console.log("quien esta ", this.usuarioLogueado);
        await this.cargarTurnos();
      }
    });
  }

  async cargarTurnos() {
    if (!this.usuarioLogueado) {
      return;
    }
  
    try {
      const turnosSnapshot = await this.firestoreService.getCollection('turnos', {
        where: [{ field: 'uidPaciente', op: '==', value: this.usuarioLogueado.uid }],
      });
  
      // Mapear los turnos y recolectar datos adicionales
      this.turnos = await Promise.all(
        turnosSnapshot.map(async (doc: any) => {
          // Obtener datos del especialista
          const especialistaDoc = await this.firestoreService.getDocument<any>(
            `especialista/${doc.uidEspecialista}`
          );
          const especialistaData = especialistaDoc.exists() ? especialistaDoc.data() : { nombre: 'Desconocido', apellido: '' };
  
          // Obtener datos de la especialidad
          const especialidadDoc = await this.firestoreService.getDocument<any>(
            `especialidades/${doc.uidEspecialidad}`
          );
          const especialidadData = especialidadDoc.exists() ? especialidadDoc.data() : { descripcion: 'Desconocida' };
  
          return {
            ...doc,
            especialista: especialistaData,
            especialidad: especialidadData.descripcion,
          };
        })
      );
  
      console.log('Turnos obtenidos: ', this.turnos);
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
    }
  }
  

  aplicarFiltros(): any[] {
    return this.turnos.filter((turno) => {
      const coincideEspecialidad =
        !this.especialidadFiltro || turno.especialidad.toLowerCase().includes(this.especialidadFiltro.toLowerCase());
      const coincideEspecialista =
        !this.especialistaFiltro ||
        `${turno.especialista.nombre} ${turno.especialista.apellido}`
          .toLowerCase()
          .includes(this.especialistaFiltro.toLowerCase());
      return coincideEspecialidad && coincideEspecialista;
    });
  }

  cancelarTurno(turno: any) {
    Swal.fire({
      title: 'Cancelar Turno',
      input: 'textarea',
      inputLabel: 'Motivo de la cancelación',
      inputPlaceholder: 'Escribe tu comentario...',
      showCancelButton: true,
      confirmButtonText: 'Cancelar Turno',
      cancelButtonText: 'Cerrar',
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        
        const comentario = result.value.trim();
        console.log("comentarioss ", comentario)
        await this.actualizarEstadoTurno(turno, 'Cancelado', comentario);
      }
    });
  }

  async actualizarEstadoTurno(turno: any, nuevoEstado: string, comentario: string = '') {
    try {
      const actualizado = { ...turno, estado: nuevoEstado, comentario };
      await this.firestoreService.updateDocument(`turnos/${turno.id}`, actualizado);
      Swal.fire('Éxito', `El turno fue cancelado exitosamente.`, 'success');
      await this.cargarTurnos();
    } catch (error) {
      console.error('Error al actualizar el turno:', error);
      Swal.fire('Error', 'No se pudo cancelar el turno. Intenta de nuevo.', 'error');
    }
  }

  completarEncuesta(turno: any) {
    Swal.fire({
      title: 'Completar Encuesta',
      input: 'textarea',
      inputLabel: 'Déjanos tu opinión sobre el especialista:',
      inputPlaceholder: 'Escribe aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar Encuesta',
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const comentario = result.value.trim();
        await this.actualizarEstadoTurno(turno, 'realizado', comentario);
      }
    });
  }
  verResenia(turno: any) {
    console.log("ver resenia ", turno);
    Swal.fire({
      title: 'Reseña del Turno',
      text: turno.comentario,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  }
  
  calificarAtencion(turno: any) {
    Swal.fire({
      title: 'Calificar Atención',
      input: 'textarea',
      inputLabel: 'Describe cómo fue la atención del especialista:',
      inputPlaceholder: 'Escribe tu opinión aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar Calificación',
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const comentario = result.value.trim();
        await this.actualizarEstadoTurno(turno, 'realizado', comentario);
      }
    });
  }
}
