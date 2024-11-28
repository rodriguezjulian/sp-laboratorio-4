import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../servicios/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-especialidades',
  templateUrl: './mostrarespecialidades.component.html',
  styleUrls: ['./mostrarespecialidades.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MostrarEspecialidadesComponent implements OnInit {
  especialistaSeleccionado: any;
  especialidades: any[] = [];
  horariosDisponibles: { [key: string]: any[] } = {};
  diasDisponibles: string[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  async loadEspecialidades() {
    const especialistaId = this.route.snapshot.paramMap.get('id');
    if (especialistaId) {
      try {
        const especialistaDoc = await this.firestoreService.getDocument<any>(`especialista/${especialistaId}`);
        this.especialistaSeleccionado = especialistaDoc.data();

        if (this.especialistaSeleccionado?.especialidad) {
          const especialidadIds = this.especialistaSeleccionado.especialidad;
          this.especialidades = [];

          for (const id of especialidadIds) {
            const especialidadDoc = await this.firestoreService.getDocument<any>(`especialidades/${id}`);
            const especialidadData = especialidadDoc.exists() ? especialidadDoc.data() : null;

            if (especialidadData) {
              this.especialidades.push({ id, ...especialidadData });
            }
          }
        }

        // Generar la semana y cargar horarios disponibles
        this.generarSemana();
        this.cargarHorariosDisponibles();
      } catch (error) {
        console.error('Error al cargar las especialidades:', error);
      }
    } else {
      console.warn('ID del especialista no encontrado en la ruta');
    }
  }

  generarSemana() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    this.diasDisponibles = Array.from({ length: 7 }, (_, i) => {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      const diaNombre = dias[fecha.getDay() - 1] || 'Sábado';
      return `${diaNombre} (${fecha.toLocaleDateString()})`;
    });
  }

  cargarHorariosDisponibles() {
    const horariosEspecialidad = this.especialistaSeleccionado.horarios;
    const diasMap: { [key: string]: any[] } = {};

    this.diasDisponibles.forEach((diaCompleto) => {
      const [dia] = diaCompleto.split(' ');
      const horario = horariosEspecialidad[dia];

      if (horario) {
        const turnos = this.generarIntervalosDeMediaHora(horario.desde, horario.hasta);
        diasMap[diaCompleto] = turnos.map((turno) => ({
          dia: diaCompleto,
          desde: turno.desde,
          hasta: turno.hasta,
        }));
      }
    });

    this.horariosDisponibles = diasMap;
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

  seleccionarEspecialidad(especialidad: any) {
    this.router.navigate(['/solicitarTurno', this.especialistaSeleccionado.id, especialidad.id]);
  }
}
