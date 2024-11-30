import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EstadoTurnoColorDirective } from '../../directivas/estado-turno-color.directive';
import { BuscarPacienteEspecialidadPipe } from '../../pipe/buscar-especialidad-paciente.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turnos-asignados',
  templateUrl: './turnos-asignados.component.html',
  styleUrls: ['./turnos-asignados.component.scss'],
  standalone: true,
  imports: [CommonModule,EstadoTurnoColorDirective,BuscarPacienteEspecialidadPipe,FormsModule],
})
export class TurnosAsignadosComponent implements OnInit {
  usuarioLogueado: User | null = null;
  buscar: string = '';
  turnos: any[] = []; // Lista de turno
  turnosAsignados: any[] = []; // Lista de turnos asignados
  BuscarEspecialistaEspecialidad: string = ''; // Input de búsqueda
  diasDisponibles: any [] = []; // Días con sus turnos

  mostrandoProximaSemana = false; // Controla si se muestra la próxima semana
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  especialidades: any[] = []; // Lista de especialidades del especialista
  especialidadSeleccionada: string | null = null; // Especialidad seleccionada para filtrar

  constructor(private firestoreService: FirestoreService, private auth: Auth) {}

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        await this.cargarEspecialidades();
        this.configurarDiasDisponibles();
        await this.cargarTurnosAsignados();
      } 
    });
  }

  async cargarEspecialidades() {
    if (!this.usuarioLogueado) {
      return;
    }

    try {
      const especialistaDoc = await this.firestoreService.getDocument<any>(
        `especialista/${this.usuarioLogueado.uid}`
      );

      const especialista = especialistaDoc.exists() ? especialistaDoc.data() : null;

      if (especialista?.especialidad) {
        // Obtén todas las especialidades disponibles
        const especialidadesSnapshot = await this.firestoreService.getCollection('especialidades');
        const todasEspecialidades = especialidadesSnapshot.map((doc: any) => ({
          id: doc.id,
          ...doc,
        }));

        this.especialidades = todasEspecialidades.filter((especialidad) =>
          especialista.especialidad.includes(especialidad.id)
        );

        if (this.especialidades.length > 0) {
          this.especialidadSeleccionada = this.especialidades[0].id; // Selecciona la primera especialidad por defecto
        }
        console.log("carga especia ", this.especialidades);
      }
    } catch (error) {
      console.error('Error al cargar especialidades:', error);
    }
  }

  configurarDiasDisponibles() {
    const hoy = new Date();
    const diaActual = hoy.getDay(); // Índice del día actual (0 = Domingo, 6 = Sábado)
    const inicioSemana = this.mostrandoProximaSemana
      ? new Date(hoy.setDate(hoy.getDate() + (7 - diaActual + 1))) // Inicio de la próxima semana
      : new Date(hoy.setDate(hoy.getDate() - diaActual + 1)); // Inicio de la semana actual

    this.diasDisponibles = this.diasSemana.map((dia, index) => {
      const fecha = new Date(inicioSemana);
      fecha.setDate(inicioSemana.getDate() + index);
      return {
        dia,
        fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
        turnos: [], // Inicializa la lista de turnos
      };
    });
  }

  async cargarTurnosAsignados() {
    if (!this.usuarioLogueado) {
      return;
    }

    try {
      // Consultar los turnos asignados al especialista
      const turnosSnapshot = await this.firestoreService.getCollection('turnos', {
        where: [
          { field: 'uidEspecialista', op: '==', value: this.usuarioLogueado.uid },
          ...(this.especialidadSeleccionada
            ? [{ field: 'uidEspecialidad', op: '==', value: this.especialidadSeleccionada }]
            : []),
        ],
      });

      const turnos = turnosSnapshot.map((doc: any) => doc);

      // Agrupar turnos por fecha para simplificar el HTML
      const turnosAgrupados: { [fecha: string]: any[] } = {};
      turnos.forEach((turno: any) => {
        if (!turnosAgrupados[turno.fecha]) {
          turnosAgrupados[turno.fecha] = [];
        }
        turnosAgrupados[turno.fecha].push(turno);
      });

      // Filtrar turnos según los días disponibles (semana actual o próxima)
      this.diasDisponibles.forEach((dia : any) => {
        dia.turnos = turnosAgrupados[dia.fecha] || [];
      });
    } catch (error) {
      console.error('Error al cargar turnos asignados:', error);
      Swal.fire('Error', 'Hubo un problema al cargar los turnos asignados.', 'error');
    }
  }//: string | null = null;


cambiarEspecialidad(especialidadId: string) {
  if (!especialidadId) {
    console.warn('Especialidad no seleccionada.');
    return;
  }

  this.especialidadSeleccionada = especialidadId;
  console.log('Especialidad seleccionada:', this.especialidadSeleccionada);

  this.cargarTurnosAsignados(); // Recarga los turnos filtrados por especialidad
}

  
  cambiarSemana(proxima: boolean) {
    this.mostrandoProximaSemana = proxima; // Cambia entre semana actual y próxima
    this.configurarDiasDisponibles(); // Reconfigura los días de la semana
    this.cargarTurnosAsignados(); // Recarga los turnos asignados
  }
  verResenia(turno: any) {
    Swal.fire({
      title: 'Reseña del Turno',
      text: turno.comentario,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  }
  verDiagnostico(turno: any) {
    Swal.fire({
      title: 'Diagnóstico',
      text: turno.diagonostico,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  }
  
  tieneTurnosAsignados(): boolean {
    return this.diasDisponibles.some((dia : any) => dia.turnos.length > 0);
  }
  abrirModal(accion: string, turno: any) {
    Swal.fire({
      title: `${accion} Turno`,
      input: 'textarea',
      inputLabel: `Escribe un comentario para ${accion.toLowerCase()} el turno`,
      inputPlaceholder: 'Escribe tu comentario aquí...',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const comentario = result.value.trim();
        if (accion === 'Cancelar') {
          this.actualizarEstadoTurno(turno, 'Cancelado', comentario);
        } else if (accion === 'Rechazar') {
          this.actualizarEstadoTurno(turno, 'Rechazado', comentario);
        } else if (accion === 'Finalizar') {
          this.actualizarEstadoTurno(turno, 'Realizado', comentario);
        }
      }
    });
  }
  
  async actualizarEstadoTurno(turno: any, nuevoEstado: string, comentario: string = '') {
    try {
      let actualizado : any;
      if(nuevoEstado == "Realizado")
      {
         actualizado = {
          ...turno,
          estado: nuevoEstado,
          diagonostico: comentario,
        };
      }
      else
      {
         actualizado = {
          ...turno,
          estado: nuevoEstado,
          comentario:comentario || turno.comentario,
        };
      }

      console.log("todo bien.", actualizado);
      await this.firestoreService.updateDocument(`turnos/${turno.id}`, actualizado);
      console.log("despues del update.");
      
      Swal.fire('Éxito', `El turno fue ${nuevoEstado.toLowerCase()} exitosamente.`, 'success');
      this.cargarTurnosAsignados(); // Recargar los turnos
    } catch (error) {
      console.error(`Error al ${nuevoEstado.toLowerCase()} el turno:`, error);
      Swal.fire('Error', `No se pudo ${nuevoEstado.toLowerCase()} el turno. Intenta de nuevo.`, 'error');
    }
  }
}
