import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { LoaderService } from '../../servicios/loader.service'
import {OcultarPrimerasPipe} from '../../pipe/ocultar-primeras.pipe'
@Component({
  selector: 'app-gestion-horarios',
  templateUrl: './gestion-horarios.component.html',
  styleUrls: ['./gestion-horarios.component.scss'],
  standalone: true,
  imports: [CommonModule,OcultarPrimerasPipe],
})
export class GestionHorariosComponent implements OnInit {
  especialista: any;
  especialidades: any[] = [];
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  turnos: string[] = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
  ];
  horariosPorDia: any = {};
  huboCambios: boolean = false;
  usuarioLogueado: User | null = null;

  constructor(private firestoreService: FirestoreService, private auth: Auth,public loader: LoaderService) {}

  async ngOnInit() {
    this.loader.setLoader(true);
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        await this.cargarEspecialista();
        await this.cargarEspecialidades();
      } else {
        this.usuarioLogueado = null;
       
      }
    });
    this.loader.setLoader(false);
  }

  async cargarEspecialista() {
    if (!this.usuarioLogueado) {

      return;
    }

    const uid = this.usuarioLogueado.uid;
    const especialistaDoc = await this.firestoreService.getDocument<any>(`especialista/${uid}`);
    this.especialista = especialistaDoc.exists() ? especialistaDoc.data() : null;

    if (this.especialista?.horarios) {
      this.horariosPorDia = this.especialista.horarios;
      this.actualizarCamposHorarios();
    }
  }

  async cargarEspecialidades() {
    if (!this.especialista?.especialidad) {
      return;
    }

    const especialidadIds = this.especialista.especialidad;
    const especialidadesSnapshot = await this.firestoreService.getDocuments<any>('especialidades');
    const todasEspecialidades = especialidadesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    this.especialidades = todasEspecialidades.filter((especialidad) =>
      especialidadIds.includes(especialidad.id)
    );
  }

  actualizarCamposHorarios() {
    for (const dia of this.dias) {
      const horarioDia = this.horariosPorDia[dia];
      if (horarioDia) {
        const selectDesde = document.getElementById(`desde-${dia}`) as HTMLSelectElement;
        if (selectDesde && horarioDia.desde) {
          selectDesde.value = horarioDia.desde;
        }

        const selectHasta = document.getElementById(`hasta-${dia}`) as HTMLSelectElement;
        if (selectHasta && horarioDia.hasta) {
          selectHasta.value = horarioDia.hasta;
        }

        const selectEspecialidad = document.getElementById(`especialidad-${dia}`) as HTMLSelectElement;
        if (selectEspecialidad && horarioDia.especialidad) {
          selectEspecialidad.value = horarioDia.especialidad;
        }
      }
    }
  }

  seleccionarEspecialidad(dia: string, event: any) {
    const especialidadId = event.target.value;
    this.horariosPorDia[dia] = this.horariosPorDia[dia] || {};
    this.horariosPorDia[dia].especialidad = especialidadId;
    this.huboCambios = true;
  }

  cambiarHorario(dia: string, tipo: string, event: any) {
    const horario = event.target.value;
    this.horariosPorDia[dia] = this.horariosPorDia[dia] || {};
    this.horariosPorDia[dia][tipo] = horario;
    this.huboCambios = true;
  }

  async guardarCambios() {
    try {
      for (const dia of this.dias) {
        const horario = this.horariosPorDia[dia];

        if (horario) {
          if (!horario.desde || !horario.hasta) {
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Debe seleccionar horarios válidos para el día ${dia}`,
            });
            return;
          }

          const desde = this.convertirHoraAEntero(horario.desde);
          const hasta = this.convertirHoraAEntero(horario.hasta);

          if (hasta <= desde || hasta - desde < 0.5) {
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `El horario "Hasta" debe ser al menos 30 minutos después del horario "Desde" para el día ${dia}.`,
            });
            return;
          }

          if (!horario.especialidad) {
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Debe seleccionar una especialidad para el día ${dia}`,
            });
            return;
          }
        }
      }

      await this.firestoreService.updateDocument(`especialista/${this.especialista.id}`, {
        horarios: this.horariosPorDia,
      });

      this.huboCambios = false;
      await Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Horarios y especialidades guardados exitosamente',
      });
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar los cambios',
      });
    }
  }

  convertirHoraAEntero(hora: string): number {
    const [horas, minutos] = hora.split(':').map(Number);
    return horas + minutos / 60;
  }
}
