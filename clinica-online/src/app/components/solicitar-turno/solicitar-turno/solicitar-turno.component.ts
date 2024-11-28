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
  horariosDisponibles: { [key: string]: { desde: string; hasta: string }[] } = {};
  diasDisponibles: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  turnoSeleccionado: { dia: string; desde: string; hasta: string } | null = null;

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
        this.cargarHorariosDisponibles();
      } else {
        Swal.fire('Error', 'Debe iniciar sesión para generar un turno.', 'error');
        this.router.navigate(['/login']);
      }
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

  cargarHorariosDisponibles() {
    const horariosEspecialidad = this.especialista.horarios;
    this.diasDisponibles.forEach((dia) => {
      const horario = horariosEspecialidad[dia];
      if (horario) {
        const turnos = this.generarIntervalosDeMediaHora(horario.desde, horario.hasta);
        this.horariosDisponibles[dia] = turnos;
      }
    });
  }

  generarIntervalosDeMediaHora(desde: string, hasta: string): { desde: string; hasta: string }[] {
    const intervalos: { desde: string; hasta: string }[] = [];
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
        intervalos.push({ desde: inicio, hasta: fin });
      }
    }

    return intervalos;
  }

  seleccionarTurno(dia: string, desde: string, hasta: string) {
    this.turnoSeleccionado = { dia, desde, hasta };
    Swal.fire('Turno Seleccionado', `Día: ${dia}, Horario: ${desde} - ${hasta}`, 'info');
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
