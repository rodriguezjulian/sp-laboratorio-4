import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EstadoTurnoColorDirective } from '../../directivas/estado-turno-color.directive';
import { BuscarPacienteEspecialidadPipe } from '../../pipe/buscar-especialidad-paciente.pipe';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoaderService } from '../../servicios/loader.service'

@Component({
  selector: 'app-turnos-asignados',
  templateUrl: './turnos-asignados.component.html',
  styleUrls: ['./turnos-asignados.component.scss'],
  standalone: true,
  imports: [CommonModule,EstadoTurnoColorDirective,BuscarPacienteEspecialidadPipe,FormsModule],
  animations: [
    trigger('slideFlip', [
      transition(':enter', [
        style({ transform: 'translateX(-100%) rotateY(90deg)', opacity: 0 }),
        animate(
          '1000ms ease-out',
          style({ transform: 'translateX(0) rotateY(0)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        animate(
          '1000ms ease-in',
          style({ transform: 'translateX(100%) rotateY(-90deg)', opacity: 0 })
        )
      ])
    ])
  ]
  
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

  constructor(private firestoreService: FirestoreService, private auth: Auth,public loader: LoaderService) {}

  async ngOnInit() {
    this.loader.setLoader(true);
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        await this.cargarEspecialidades();
        this.configurarDiasDisponibles();
        await this.cargarTurnosAsignados();
        this.loader.setLoader(false);
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
        ],
      });

      const turnos = turnosSnapshot.map((doc: any) => doc);
      //aca tengo que traerme a los pacientes, me traigo a todos, y arranco a filtar
      const pacientes = await this.firestoreService.getPacientes();
      const especialidades = await this.firestoreService.getEspecialidades();
      turnos.forEach(turno => {
        pacientes.forEach(paciente => {
          if(turno.uidPaciente == paciente.id)
          {
            turno.nombre = paciente.nombre + " " +  paciente.apellido;
          }
        });

        especialidades.forEach(especialidad => {
          if(turno.uidEspecialidad == especialidad.id)
            {
              turno.especialidad = especialidad.descripcion;
            }
        });
      });

      console.log("a ver como quedan asi los turnos :", turnos)

      // Agrupar turnos por fecha para simplificar el HTML
      const turnosAgrupados: { [fecha: string]: any[] } = {};

      // Agrupar los turnos por fecha
      turnos.forEach((turno: any) => {
          if (!turnosAgrupados[turno.fecha]) {
              turnosAgrupados[turno.fecha] = [];
          }
          turnosAgrupados[turno.fecha].push(turno);
      });
      
      // Ordenar los turnos dentro de cada grupo por horario
      Object.keys(turnosAgrupados).forEach((fecha) => {
          turnosAgrupados[fecha].sort((a: any, b: any) => {
              const horaA = a.desde; // Asume formato HH:mm
              const horaB = b.desde;
              return horaA.localeCompare(horaB); // Orden ascendente por hora
          });
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

  abrirHistoriaClinica(turno: any) {
    let altura = '';
    let peso = '';
    let temperatura = '';
    let presion = '';
    let calificacionSalud = 50; // Default para el control de rango
    let diasParaRevisar = ''; // Para el cuadro de texto numérico
    let reservarConsulta = false; // Default para el switch
    const datosDinamicos: { clave: string; valor: string }[] = [];
  
    Swal.fire({
      title: 'Historia Clínica',
      html: `
        <div class="container">
          <div class="mb-3">
            <label class="form-label fw-bold">Altura (cm):</label>
            <input type="number" id="altura" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Peso (kg):</label>
            <input type="number" id="peso" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Temperatura (°C):</label>
            <input type="number" id="temperatura" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Presión arterial:</label>
            <input type="text" id="presion" class="form-control" />
          </div>
  
          <!-- Control de rango -->
          <div class="mb-3">
            <label class="form-label fw-bold">Calificación General de Salud:</label>
            <input type="range" id="calificacionSalud" class="form-range" min="0" max="100" value="50" />
            <span id="calificacionValor">50</span>
          </div>
  
          <!-- Cuadro de texto numérico -->
          <div class="mb-3">
            <label class="form-label fw-bold">Días estimados para próxima revisión:</label>
            <input type="number" id="diasParaRevisar" class="form-control" />
          </div>
  
          <!-- Switch -->
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="reservarConsulta" />
            <label class="form-check-label" for="reservarConsulta">¿Reservar otra consulta?</label>
          </div>
  
          <div id="datos-dinamicos-container">
            <label class="form-label fw-bold">Datos Dinámicos (máximo 3):</label>
            <div class="input-group mb-2">
              <input type="text" placeholder="Clave" class="form-control clave-dinamico" />
              <input type="text" placeholder="Valor" class="form-control valor-dinamico" />
            </div>
          </div>
          <button id="add-dynamic" class="btn btn-primary btn-sm w-100 mb-3">Agregar Dato Dinámico</button>
        </div>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      didOpen: () => {
        // Actualizar el valor visual del control de rango
        const calificacionInput = document.getElementById('calificacionSalud') as HTMLInputElement;
        const calificacionValor = document.getElementById('calificacionValor');
        calificacionInput?.addEventListener('input', () => {
          if (calificacionValor) {
            calificacionValor.textContent = calificacionInput.value;
          }
        });
      },
      preConfirm: () => {
        altura = (document.getElementById('altura') as HTMLInputElement).value;
        peso = (document.getElementById('peso') as HTMLInputElement).value;
        temperatura = (document.getElementById('temperatura') as HTMLInputElement).value;
        presion = (document.getElementById('presion') as HTMLInputElement).value;
        calificacionSalud = +(document.getElementById('calificacionSalud') as HTMLInputElement).value;
        diasParaRevisar = (document.getElementById('diasParaRevisar') as HTMLInputElement).value;
        reservarConsulta = (document.getElementById('reservarConsulta') as HTMLInputElement).checked;
  
        const claves = Array.from(document.querySelectorAll('.clave-dinamico')).map(
          (input: any) => input.value.trim()
        );
        const valores = Array.from(document.querySelectorAll('.valor-dinamico')).map(
          (input: any) => input.value.trim()
        );
  
        claves.forEach((clave, index) => {
          if (clave && valores[index]) {
            datosDinamicos.push({ clave, valor: valores[index] });
          }
        });
  
        // Validaciones
        if (!altura || !peso || !temperatura || !presion || !diasParaRevisar) {
          Swal.showValidationMessage('Por favor completa todos los campos obligatorios.');
          return;
        }
  
        if (claves.length > 3 || valores.length > 3) {
          Swal.showValidationMessage('Solo puedes agregar hasta 3 datos dinámicos.');
          return;
        }
  
        if (claves.some((clave, index) => (clave && !valores[index]) || (!clave && valores[index]))) {
          Swal.showValidationMessage('Cada clave debe tener un valor correspondiente.');
          return;
        }
  
        return { altura, peso, temperatura, presion, calificacionSalud, diasParaRevisar, reservarConsulta, datosDinamicos };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const historiaClinica = result.value;
        turno.historiaClinica = historiaClinica;
  
        // Guardar en la base de datos
        this.firestoreService.updateDocument(`turnos/${turno.id}`, { historiaClinica }).then(() => {
          Swal.fire('Guardado', 'Historia clínica guardada con éxito.', 'success');
        });
      }
    });
  }
  
  
}
