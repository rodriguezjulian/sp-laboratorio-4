import { Component, OnInit, Input } from '@angular/core';
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
  @Input() especialista: any;
  @Input() especialidad: any;
  @Input() paciente: any;

  usuarioLogueado: User | null = null;
  horariosDisponibles: { [key: string]: { desde: string; hasta: string; estado: boolean }[] } = {};
  diasDisponibles: { dia: string; fecha: string }[] = [];
  mostrandoProximaSemana = false;

  constructor(private firestoreService: FirestoreService, private auth: Auth) {}

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        this.configurarDiasDisponibles();
        await this.cargarHorariosDisponibles();
      }
    });
  }

  configurarDiasDisponibles() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const hoy = new Date();
    const diaActualIndex = hoy.getDay() === 0 ? 6 : hoy.getDay() - 1;

    const inicioDias = this.mostrandoProximaSemana
      ? new Date(hoy.setDate(hoy.getDate() + (7 - diaActualIndex)))
      : new Date(hoy);

    this.diasDisponibles = Array.from({ length: 7 }, (_, index) => {
      const fecha = new Date(inicioDias);
      fecha.setDate(inicioDias.getDate() + index);
      const dia = dias[(diaActualIndex + index) % dias.length];
      return {
        dia,
        fecha: fecha.toISOString().split('T')[0],
      };
    }).filter((diaData) => diaData.dia !== 'Domingo');
  }

  async cargarHorariosDisponibles() {
    if (!this.especialista || !this.especialidad) {
      Swal.fire('Error', 'Datos insuficientes para cargar los horarios.', 'error');
      return;
    }

    const horariosEspecialidad = this.especialista.horarios;

    const turnosAsignados = await this.firestoreService.getCollection('turnos', {
      where: [
        { field: 'uidEspecialista', op: '==', value: this.especialista.id },
        { field: 'uidEspecialidad', op: '==', value: this.especialidad.id },
      ],
    });

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

    this.diasDisponibles.forEach(({ dia, fecha }) => {
      const horario = horariosEspecialidad[dia];
      if (horario && horario.especialidad.includes(this.especialidad.id)) {
        const turnos = this.generarIntervalosDeMediaHora(horario.desde, horario.hasta);

        const turnosConEstado = turnos.map((turno) => ({
          ...turno,
          estado: !turnosAsignadosPorDia[`${dia}_${fecha}`]?.some(
            (asignado) => asignado.desde === turno.desde && asignado.hasta === turno.hasta
          ),
        }));

        this.horariosDisponibles[dia] = turnosConEstado;
      } else {
        this.horariosDisponibles[dia] = [];
      }
    });
  }

  async confirmarTurno(dia: string, desde: string, hasta: string, fecha: string) {
    if (!this.usuarioLogueado) {
      Swal.fire('Error', 'Debe iniciar sesión para reservar un turno.', 'error');
      return;
    }
    console.log("xd ", this.usuarioLogueado.uid);
    const nuevoTurno = {
      uidEspecialista: this.especialista.id,
      uidEspecialidad: this.especialidad.id,
      uidPaciente: this.paciente?.id ?? this.usuarioLogueado.uid,
      dia,
      desde,
      hasta,
      fecha,
      estado: 'pendiente',
      creadoEn: new Date(),
      comentario: '',
      encuesta: ''
    };

    try {
      await this.firestoreService.createDocument('turnos', nuevoTurno);
      Swal.fire(
        'Turno Guardado',
        `Tu turno ha sido guardado exitosamente para el ${dia}, ${fecha} de ${desde} a ${hasta}.`,
        'success'
      );
      await this.cargarHorariosDisponibles();
    } catch (error) {
      console.error('Error al guardar el turno:', error);
      Swal.fire('Error', 'No se pudo guardar el turno. Intente nuevamente.', 'error');
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
}
