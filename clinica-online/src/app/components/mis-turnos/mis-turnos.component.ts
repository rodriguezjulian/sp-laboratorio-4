import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { EstadoTurnoColorDirective } from '../../directivas/estado-turno-color.directive';
import { BuscarEspecialistaEspecialidadPipe } from '../../pipe/buscar-especialista-especialidad.pipe';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoaderService } from '../../servicios/loader.service'

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,EstadoTurnoColorDirective,BuscarEspecialistaEspecialidadPipe],
  animations: [
    trigger('pulseZoom', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate(
          '1000ms ease-in-out',
          style({ transform: 'scale(1.1)', opacity: 1 })
        ),
        animate(
          '300ms ease-in-out',
          style({ transform: 'scale(1)' })
        )
      ]),
      transition(':leave', [
        animate(
          '1000ms ease-in-out',
          style({ transform: 'scale(0)', opacity: 0 })
        )
      ])
    ])
  ]
  
})
export class MisTurnosComponent implements OnInit {
  usuarioLogueado: User | null = null;
  BuscarEspecialistaEspecialidad: string = ''; // Input de búsqueda
  turnos: any[] = [];
  especialidadFiltro: string = '';
  calificacion: number = 0; // Estrellas
  comentario: string = ''; // Cuadro de texto
  opinion: string = ''; // Radio button
  preferencia: string[] = []; // Checkboxes
  satisfaccion: number = 50; // Control de rango
  especialistaFiltro: string = '';
  estadosTurnos: { [key: string]: string } = {
    pendiente: 'Pendiente',
    cancelado: 'Cancelado',
    realizado: 'Realizado',
    rechazado: 'Rechazado',
  };

  constructor(private firestoreService: FirestoreService, private auth: Auth,public loader: LoaderService) {}

  ngOnInit() {
    this.loader.setLoader(true);
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        console.log("quien esta ", this.usuarioLogueado);
        await this.cargarTurnos();
      }
    });
    this.loader.setLoader(false);
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
          const especialistaDoc = await this.firestoreService.getDocument<any>(
            `especialista/${doc.uidEspecialista}`
          );
          const especialistaData = especialistaDoc.exists() ? especialistaDoc.data() : { nombre: 'Desconocido', apellido: '' };
  
          const especialidadDoc = await this.firestoreService.getDocument<any>(
            `especialidades/${doc.uidEspecialidad}`
          );
          const especialidadData = especialidadDoc.exists() ? especialidadDoc.data() : { descripcion: 'Desconocida' };
  
          return {
            ...doc,
            especialista: especialistaData,
            especialidad: especialidadData.descripcion,
            comentario: doc.comentario || '', // Asegurar que siempre haya un campo comentario
          };
        })
      );
      console.log("antes de ordenar por fecha ", this.turnos[0].fecha)
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



  /*completarEncuesta(turno: any) {
    Swal.fire({
      title: 'Completar Encuesta',
      input: 'textarea',
      inputLabel: 'Déjanos tu opinión sobre el especialista:',
      inputPlaceholder: 'Escribe aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar Encuesta',
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const encuesta = result.value.trim();
        const actualizado = { ...turno, estado: "Realizado", encuesta };
        await this.firestoreService.updateDocument(`turnos/${turno.id}`, actualizado);
        await this.cargarTurnos();
      }
    });
  }*/

  completarCalificacion(turno: any) {
    Swal.fire({
      title: 'Completar Calificacion',
      input: 'textarea',
      inputLabel: 'Déjanos tu calificacion sobre el especialista:',
      inputPlaceholder: 'Escribe aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar Calificacion',
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const calificacion = result.value.trim();
        const actualizado = { ...turno, estado: "Realizado", calificacion };
        await this.firestoreService.updateDocument(`turnos/${turno.id}`, actualizado);
        await this.cargarTurnos();
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
  completarEncuesta(turno: any) {
    Swal.fire({
      title: 'Encuesta de Satisfacción',
      html: `
        <div class="container">
          <div class="mb-3">
            <label class="form-label fw-bold">¿Nos recomendarías?</label><br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="opinion" value="Si" id="opinionSi">
              <label class="form-check-label" for="opinionSi">Sí</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="opinion" value="No" id="opinionNo">
              <label class="form-check-label" for="opinionNo">No</label>
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label fw-bold">Satisfacción (1-10):</label>
            <input type="range" min="1" max="10" value="5" id="satisfaccionRange" class="form-range">
            <span id="satisfaccionValue" class="badge bg-primary">5</span>
          </div>
  
          <div class="mb-3">
            <label class="form-label fw-bold">Estrellas (0-5):</label>
            <input type="number" min="0" max="5" id="calificacionInput" class="form-control">
          </div>
  
          <div class="mb-3">
            <label class="form-label fw-bold">Comentario:</label>
            <textarea id="comentarioInput" class="form-control" rows="3"></textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      preConfirm: () => {
        const opinion = (document.querySelector('input[name="opinion"]:checked') as HTMLInputElement)?.value || '';
        const preferencia = Array.from(
          document.querySelectorAll('input[type="checkbox"]:checked')
        ).map((checkbox: any) => checkbox.value);
        const satisfaccion = (document.getElementById('satisfaccionRange') as HTMLInputElement)?.value;
        const calificacion = (document.getElementById('calificacionInput') as HTMLInputElement)?.value;
        const comentario = (document.getElementById('comentarioInput') as HTMLTextAreaElement)?.value;
  
        const datos = {
          opinion,
          preferencia,
          satisfaccion: Number(satisfaccion),
          calificacion: Number(calificacion),
          comentario,
        };
  
        if (!opinion || !calificacion) {
          Swal.showValidationMessage('Por favor completa todos los campos obligatorios.');
          return;
        }
  
        console.log('Datos de la encuesta:', datos);
        return datos;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        turno.encuesta = result.value;
        this.firestoreService.updateDocument(`turnos/${turno.id}`, { encuesta: result.value });
        Swal.fire('¡Gracias!', 'Encuesta enviada con éxito', 'success');
      }
    });
  }
  
  
}
