import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { BuscarEspecialistaEspecialidadPipe } from '../../pipe/buscar-especialista-especialidad.pipe';
import { FormsModule } from '@angular/forms';
import { EstadoTurnoColorDirective } from '../../directivas/estado-turno-color.directive';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BuscarEspecialistaEspecialidadPipe,EstadoTurnoColorDirective],
})
export class TurnosComponent implements OnInit {
  turnos: any[] = []; // Lista de turnos
  BuscarEspecialistaEspecialidad: string = ''; // Input de búsqueda

  constructor(private firestoreService: FirestoreService) {}

  async ngOnInit() {
    await this.cargarTurnos();
  }

  async cargarTurnos() {
    try {
      const turnosSnapshot = await this.firestoreService.getCollection('turnos');
      this.turnos = await Promise.all(
        turnosSnapshot.map(async (turno: any) => {
          const especialistaDoc = await this.firestoreService.getDocument<any>(`especialista/${turno.uidEspecialista}`);
          const especialistaData = especialistaDoc.exists() ? especialistaDoc.data() : null;
  
          const pacienteDoc = await this.firestoreService.getDocument<any>(`paciente/${turno.uidPaciente}`);
          const pacienteData = pacienteDoc.exists() ? pacienteDoc.data() : null;
  
          const especialidadDoc = await this.firestoreService.getDocument<any>(`especialidades/${turno.uidEspecialidad}`);
          const especialidadData = especialidadDoc.exists() ? especialidadDoc.data() : null;
  
          // Convertir turno.dia a una fecha válida
          const fechaBase = new Date(); // Fecha actual como base
          const diaMap: { [key: string]: number } = {
            Lunes: 1,
            Martes: 2,
            Miércoles: 3,
            Jueves: 4,
            Viernes: 5,
            Sábado: 6,
            Domingo: 0,
          };
          const diaIndex = diaMap[turno.dia];
          if (diaIndex !== undefined) {
            fechaBase.setDate(fechaBase.getDate() + (diaIndex - fechaBase.getDay() + 7) % 7);
            turno.dia = fechaBase.toISOString(); // Convertir a ISO string
          }
  
          return {
            ...turno,
            especialista: especialistaData || { nombre: 'Desconocido', apellido: '' },
            paciente: pacienteData || { nombre: 'Desconocido', apellido: '' },
            especialidad: especialidadData ? especialidadData.descripcion : 'Desconocida',
          };
        })
      );
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
      Swal.fire('Error', 'No se pudieron cargar los turnos.', 'error');
    }
  }
  

  CancelarTurno(turno: any) {
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
        await this.actualizarEstadoTurno(turno, 'Cancelado', comentario);
      }
    });
  }

  async actualizarEstadoTurno(turno: any, nuevoEstado: string, comentario: string = '') {
    try {
      const actualizado = { ...turno, estado: nuevoEstado, comentario: comentario || turno.comentario };
      await this.firestoreService.updateDocument(`turnos/${turno.id}`, actualizado);
      Swal.fire('Éxito', `El turno fue cancelado exitosamente.`, 'success');
      await this.cargarTurnos();
    } catch (error) {
      console.error('Error al actualizar el turno:', error);
      Swal.fire('Error', 'No se pudo cancelar el turno. Intenta de nuevo.', 'error');
    }
  }
}
