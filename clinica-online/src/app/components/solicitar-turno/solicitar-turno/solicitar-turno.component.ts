import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../servicios/firestore.service';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SolicitarTurnoComponent implements OnInit {
  especialista: any;
  especialidad: any;
  usuarioLogueado: User | null = null;
  horariosDisponibles: { [key: string]: { desde: string; hasta: string; estado: boolean }[] } = {};
  diasDisponibles: { dia: string; fecha: string }[] = []; // Cambiado de string[] a objeto con día y fecha
  turnoSeleccionado: { dia: string; desde: string; hasta: string; fecha: string } | null = null;
  mostrandoProximaSemana = false;

  constructor(
    private firestoreService: FirestoreService,
    private auth: Auth,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        await this.cargarEspecialistaYEspecialidad();
        this.configurarDiasDisponibles();
        await this.cargarHorariosDisponibles();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  configurarDiasDisponibles() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diaActual = hoy.getDay(); // Obtiene el índice del día actual (0 = Domingo, 6 = Sábado)
    const inicioSemana = this.mostrandoProximaSemana
      ? new Date(hoy.setDate(hoy.getDate() + (7 - diaActual + 1))) // Inicio de la próxima semana
      : new Date(hoy.setDate(hoy.getDate() - diaActual + 1)); // Inicio de la semana actual

    this.diasDisponibles = dias.map((dia, index) => {
      const fecha = new Date(inicioSemana);
      fecha.setDate(inicioSemana.getDate() + index);
      return {
        dia,
        fecha: fecha.toISOString().split('T')[0], // Guardar la fecha como YYYY-MM-DD
      };
    });
  }

  async cargarEspecialistaYEspecialidad() {
    const especialistaId = this.route.snapshot.paramMap.get('especialistaId');
    const especialidadId = this.route.snapshot.paramMap.get('especialidadId');

    if (!especialistaId || !especialidadId) {
      Swal.fire('Error', 'Datos insuficientes para cargar los turnos.', 'error');
      this.router.navigate(['/mostrarEspecialistas']);
      return;
    }

    const especialistaDoc = await this.firestoreService.getDocument<any>(`especialista/${especialistaId}`);
    this.especialista = especialistaDoc.exists() ? especialistaDoc.data() : null;

    const especialidadDoc = await this.firestoreService.getDocument<any>(`especialidades/${especialidadId}`);
    this.especialidad = especialidadDoc.exists() ? especialidadDoc.data() : null;

    if (!this.especialista || !this.especialidad) {
      Swal.fire('Error', 'Especialista o especialidad no encontrada.', 'error');
      this.router.navigate(['/mostrarEspecialistas']);
    }
  }

  async cargarHorariosDisponibles() {
  const horariosEspecialidad = this.especialista.horarios;

  // Obtén los turnos asignados desde la base de datos
  const turnosAsignados = await this.firestoreService.getCollection('turnos', {
    where: [
      { field: 'uidEspecialista', op: '==', value: this.route.snapshot.paramMap.get('especialistaId') },
      { field: 'uidEspecialidad', op: '==', value: this.route.snapshot.paramMap.get('especialidadId') },
    ],
  });

  // Crear un mapa de turnos asignados por día y fecha
  const turnosAsignadosPorDia: { [key: string]: { desde: string; hasta: string }[] } = {};
  turnosAsignados.forEach((asignado: any) => {
    const claveDiaFecha = `${asignado.dia}_${asignado.fecha}`;
    if (!turnosAsignadosPorDia[claveDiaFecha]) {
      turnosAsignadosPorDia[claveDiaFecha] = [];
    }
    turnosAsignadosPorDia[claveDiaFecha].push({
      desde: asignado.desde,
      hasta: asignado.hasta,
    });
  });

  // Generar horarios disponibles basados en los horarios del especialista y los turnos ocupados
  this.diasDisponibles.forEach(({ dia, fecha }) => {
    const horario = horariosEspecialidad[dia];
    if (horario) {
      const turnos = this.generarIntervalosDeMediaHora(horario.desde, horario.hasta);

      // Marca como ocupado si coincide con un turno asignado
      const turnosConEstado = turnos.map((turno) => ({
        ...turno,
        estado: !turnosAsignadosPorDia[`${dia}_${fecha}`]?.some(
          (asignado) => asignado.desde === turno.desde && asignado.hasta === turno.hasta
        ),
      }));

      // Almacena los turnos disponibles por día
      this.horariosDisponibles[dia] = turnosConEstado;
    }
  });
}
async confirmarTurno() {
  if (!this.turnoSeleccionado || !this.usuarioLogueado) {
    Swal.fire('Error', 'Debe seleccionar un turno para confirmar.', 'error');
    return;
  }

  const nuevoTurno = {
    uidEspecialista: this.route.snapshot.paramMap.get('especialistaId'),
    uidEspecialidad: this.route.snapshot.paramMap.get('especialidadId'),
    uidPaciente: this.usuarioLogueado.uid,
    ...this.turnoSeleccionado,
    estado: 'pendiente',
    creadoEn: new Date(),
  };

  try {
    await this.firestoreService.createDocument('turnos', nuevoTurno);
    Swal.fire('Éxito', 'Turno generado exitosamente.', 'success');
    this.router.navigate(['/home']);
  } catch (error) {
    console.error('Error al generar el turno:', error);
    Swal.fire('Error', 'No se pudo generar el turno. Intente nuevamente.', 'error');
  }
}



  generarIntervalosDeMediaHora(desde: string, hasta: string): { desde: string; hasta: string; estado: boolean }[] {
    const intervalos: { desde: string; hasta: string; estado: boolean }[] = [];
    let [horas, minutos] = desde.split(':').map(Number);
    const [horasFin, minutosFin] = hasta.split(':').map(Number);

    while (horas < horasFin || (horas === horasFin && minutos < minutosFin)) {
      const inicio = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
      minutos += 30;
      if (minutos === 60) {
        minutos = 0;
        horas++;
      }
      const fin = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
      if (horas < horasFin || (horas === horasFin && minutos <= minutosFin)) {
        intervalos.push({ desde: inicio, hasta: fin, estado: true });
      }
    }

    return intervalos;
  }

  cambiarSemana(proxima: boolean) {
    this.mostrandoProximaSemana = proxima;
    this.configurarDiasDisponibles();
    this.cargarHorariosDisponibles();
  }

  seleccionarTurno(dia: string, desde: string, hasta: string, fecha: string) {
    this.turnoSeleccionado = {
      dia,
      desde,
      hasta,
      fecha,
    };

    Swal.fire('Turno Seleccionado', `Día: ${dia}, Fecha: ${fecha}, Horario: ${desde} - ${hasta}`, 'info');
  }
}
