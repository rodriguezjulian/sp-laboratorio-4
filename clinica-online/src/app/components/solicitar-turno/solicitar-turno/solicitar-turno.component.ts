import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../servicios/firestore.service';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  diasDisponibles: string[] = []; // Se reordenarán dinámicamente
  turnoSeleccionado: { dia: string; desde: string; hasta: string; fecha: string } | null = null;

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
        this.configurarDiasDisponibles(); // Reordenar los días disponibles
        this.cargarHorariosDisponibles();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  configurarDiasDisponibles() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diaActual = hoy.toLocaleDateString('es-ES', { weekday: 'long' });
    const indiceActual = dias.findIndex((dia) => dia.toLowerCase() === diaActual.toLowerCase());

    // Reordenar los días para que comiencen desde el día actual
    this.diasDisponibles = [...dias.slice(indiceActual), ...dias.slice(0, indiceActual)];
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

    const turnosAsignados = await this.firestoreService.getCollection('turnos', {
      where: [
        { field: 'uidEspecialista', op: '==', value: this.route.snapshot.paramMap.get('especialistaId') },
        { field: 'uidEspecialidad', op: '==', value: this.route.snapshot.paramMap.get('especialidadId') },
      ],
    });

    const turnosAsignadosPorDia: { [key: string]: any[] } = {};
    turnosAsignados.forEach((asignado: any) => {
      if (!turnosAsignadosPorDia[asignado.dia]) {
        turnosAsignadosPorDia[asignado.dia] = [];
      }
      turnosAsignadosPorDia[asignado.dia].push({ desde: asignado.desde, hasta: asignado.hasta });
    });

    this.diasDisponibles.forEach((dia) => {
      const horario = horariosEspecialidad[dia];
      if (horario && horario.especialidad.includes(this.route.snapshot.paramMap.get('especialidadId'))) {
        const turnos = this.generarIntervalosDeMediaHora(horario.desde, horario.hasta);

        const turnosConEstado = turnos.map((turno) => ({
          ...turno,
          estado: !turnosAsignadosPorDia[dia]?.some(
            (asignado: any) => asignado.desde === turno.desde && asignado.hasta === turno.hasta
          ),
        }));

        this.horariosDisponibles[dia] = turnosConEstado;
      }
    });
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

  seleccionarTurno(dia: string, desde: string, hasta: string) {
    const hoy = new Date();
    const diaIndex = this.diasDisponibles.indexOf(dia);
    const fechaTurno = new Date(hoy);
    fechaTurno.setDate(hoy.getDate() + diaIndex);

    this.turnoSeleccionado = {
      dia,
      desde,
      hasta,
      fecha: fechaTurno.toISOString().split('T')[0], // Formato YYYY-MM-DD
    };

    Swal.fire('Turno Seleccionado', `Día: ${dia}, Fecha: ${this.turnoSeleccionado.fecha}, Horario: ${desde} - ${hasta}`, 'info');
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
}
