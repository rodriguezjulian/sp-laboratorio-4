import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { BuscarEspecialistaEspecialidadPipe } from '../../pipe/buscar-especialista-especialidad.pipe';
import { FormsModule } from '@angular/forms';
import { EstadoTurnoColorDirective } from '../../directivas/estado-turno-color.directive';
import { getDownloadURL } from '@angular/fire/storage';

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
  
      // Mapear los turnos y recolectar datos adicionales
      this.turnos = await Promise.all(
        turnosSnapshot.map(async (doc: any) => {
          const especialistaDoc = await this.firestoreService.getDocument<any>(
            `especialista/${doc.uidEspecialista}`
          );
          const especialistaData = especialistaDoc.exists() ? especialistaDoc.data() : { nombre: 'Desconocido', apellido: '' };
  
          const especialidadDoc = await this.firestoreService.getDocument<any>(
            `especialidades/${doc.uidEspecialidad}`
          );
          const especialidadData = especialidadDoc.exists() ? especialidadDoc.data() : { descripcion: 'Desconocida' };

          const pacientes = await this.firestoreService.getDocument<any>(
            `paciente/${doc.uidPaciente}`
          );
          const pacientesdata = pacientes.exists() ? pacientes.data() : { nombre: 'Desconocida' , apellido : 'Desconocido'};
//turnosSnapshot
          return {
            ...doc,
            especialista: especialistaData,
            especialidad: especialidadData.descripcion,
            paciente : pacientesdata,
          };
        })
      );

      this.turnos.sort((a: any, b: any) => {
        // Ordenar por fecha
        const fechaA = new Date(a.fecha).getTime();
        const fechaB = new Date(b.fecha).getTime();
        if (fechaA !== fechaB) {
            return fechaA - fechaB; // Orden ascendente por fecha
        }
    
        // Si las fechas son iguales, ordenar por hora
        const horaA = a.desde; // Asume formato HH:mm
        const horaB = b.desde;
        return horaA.localeCompare(horaB); // Orden ascendente por hora
    });
    
  
      console.log('Turnos obtenidos: ', this.turnos);
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
    }
  }
/*
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
  
           Convertir turno.dia a una fecha válida
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
          }*/
         /* return {
            ...turno,
            especialista: especialistaData || { nombre: 'Desconocido', apellido: '' },
            paciente: pacienteData || { nombre: 'Desconocido', apellido: '' },
            especialidad: especialidadData ? especialidadData.descripcion : 'Desconocida',
          };
        })
      );

    console.log("antes de ordenar por fecha ", this.turnos[0].fecha)
    
    this.turnos.sort((a: any, b: any) => {
      const fechaA = new Date(a.dia).getTime();
      const fechaB = new Date(b.dia).getTime();
      return fechaA - fechaB; // Orden ascendente
    });
    console.log("aca ", this.turnos);
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
      Swal.fire('Error', 'No se pudieron cargar los turnos.', 'error');
    }
  }*/
  
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
