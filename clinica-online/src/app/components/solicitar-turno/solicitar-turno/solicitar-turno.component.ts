import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../../servicios/firestore.service';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-generar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('flipIn', [
      transition(':enter', [
        style({ transform: 'rotateY(-90deg)', opacity: 0 }),
        animate(
          '1000ms ease-out',
          style({ transform: 'rotateY(0)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        animate(
          '800ms ease-in',
          style({ transform: 'rotateY(90deg)', opacity: 0 })
        )
      ])
    ])
  ]
  
})
export class SolicitarTurnoComponent implements OnInit {
  @Input() especialista: any;
  @Input() especialidad: any;
  @Input() paciente: any;

  usuarioLogueado: User | null = null;
  horariosDisponibles: { [key: string]: { desde: string; hasta: string; estado: boolean }[] } = {};
  diasDisponibles: { dia: string; fecha: string }[] = [];
  mostrandoProximaSemana = false;
  diaSeleccionado: string | null = null;

  constructor(private firestoreService: FirestoreService, private auth: Auth) {}

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        this.configurarDiasDisponibles();
        //await this.cargarHorariosDisponibles();
      }
    });
  }
    async seleccionarDia(fecha: string) {
      let aux = fecha;
      this.diaSeleccionado = null;

    await this.cargarHorariosDisponibles();
    
    this.cargarHorariosDisponibles(); // Recargar horarios según el día seleccionado
    this.diaSeleccionado = aux;
    await this.cargarHorariosDisponibles();
    
    this.cargarHorariosDisponibles(); // Recargar horarios según el día seleccionado

  }
  
  
  configurarDiasDisponibles() {
    if (!this.especialista || !this.especialidad) {
      console.error('Especialista o especialidad no definidos');
      return;
    }
  
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const hoy = new Date();
    const diaActualIndex = hoy.getDay() === 0 ? 6 : hoy.getDay() - 1;
  
    const inicioDias = this.mostrandoProximaSemana
      ? new Date(hoy.setDate(hoy.getDate() + (7)))
      : new Date(hoy);
  
    // Filtrar los días en los que el especialista atiende la especialidad seleccionada
    const diasEspecialista = Object.keys(this.especialista.horarios).filter((dia) =>
      this.especialista.horarios[dia].especialidad === this.especialidad.id
    );
  
    // Generar los días disponibles basados en el filtro y ordenar por fecha
    this.diasDisponibles = diasEspecialista
      .map((dia) => {
        const index = dias.indexOf(dia); // Obtener el índice del día
        const fecha = new Date(inicioDias);
        fecha.setDate(fecha.getDate() + (index - diaActualIndex + 7) % 7); // Ajustar la fecha según el índice
        return {
          dia,
          fecha: fecha.toISOString().split('T')[0], // Convertir a formato YYYY-MM-DD
        };
      })
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()); // Ordenar por fecha
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
      if (this.diaSeleccionado === fecha) { // Filtrar solo el día seleccionado
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
      encuesta: '',
      calificacion: ""
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
    this.diaSeleccionado = null;
    this.horariosDisponibles = {};
    this.mostrandoProximaSemana = proxima;
    this.configurarDiasDisponibles();
    this.cargarHorariosDisponibles();
  }
}
