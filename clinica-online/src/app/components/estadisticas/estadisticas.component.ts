import * as XLSX from 'xlsx';
import { FirestoreService } from '../../servicios/firestore.service'; // Ajusta la ruta de tu servicio
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  standalone: true,
})
export class EstadisticasComponent {
  constructor(private firestoreService: FirestoreService) {}

  cantidadDeTurnosPorEspecialidad: { [key: string]: number } = {};
  tortaChart: Chart | undefined; // Declarar la propiedad

  async ngOnInit() {
    await this.obtenerTurnosPorEspecialidad();
  }

  async obtenerTurnosPorEspecialidad() {
    const turnos = await this.firestoreService.getTurnos();
    const especialidades = await this.firestoreService.getEspecialidades();

    let especialidadesConRepeticion: string[] = [];
    console.log('Turnos generales: ', turnos);

    // Crear una lista con las descripciones de las especialidades
    turnos.forEach((turno) => {
      especialidades.forEach((especialidad) => {
        if (turno.uidEspecialidad == especialidad.id) {
          especialidadesConRepeticion.push(especialidad.descripcion);
        }
      });
    });

    // Calcular la cantidad de repeticiones por especialidad
    especialidadesConRepeticion.forEach((especialidad) => {
      if (this.cantidadDeTurnosPorEspecialidad[especialidad]) {
        this.cantidadDeTurnosPorEspecialidad[especialidad]++;
      } else {
        this.cantidadDeTurnosPorEspecialidad[especialidad] = 1;
      }
    });

    console.log(this.cantidadDeTurnosPorEspecialidad);

    // Crear el gráfico
    this.crearGraficoTortaPorEspecialidad();
  }

  crearGraficoTortaPorEspecialidad() {
    if (Object.keys(this.cantidadDeTurnosPorEspecialidad).length === 0) {
      console.warn('No hay datos para mostrar en el gráfico.');
      return;
    }

    const labels = Object.keys(this.cantidadDeTurnosPorEspecialidad);
    const data = Object.values(this.cantidadDeTurnosPorEspecialidad);

    const ctx = document.getElementById(
      'tortaEspecialidadChart'
    ) as HTMLCanvasElement;
    if (ctx) {
      if (this.tortaChart) {
        this.tortaChart.destroy(); // Destruye el gráfico anterior si existe
      }

      this.tortaChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 18,
                },
              },
            },
            title: {
              display: true,
              text: 'Cantidad de Turnos por Especialidad',
              font: {
                size: 24,
              },
            },
          },
        },
      });
    }
  }

  async descargarLogins() {
    try {
      // Obtener los logins desde Firestore
      const logins = await this.firestoreService.getCollection('logueos');
      if (!logins || logins.length === 0) {
        console.warn('No se encontraron registros de logins.');
        return;
      }

      // Formatear los datos para el archivo Excel
      const data = logins.map((login: any) => ({
        Usuario: login.usuario,
        Fecha: login.creado.toDate().toLocaleDateString(), // Convierte la marca de tiempo a fecha
        Hora: login.creado.toDate().toLocaleTimeString(), // Convierte la marca de tiempo a hora
      }));

      // Crear el archivo Excel
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Logins');
      XLSX.writeFile(wb, 'Logins_Usuarios.xlsx');
    } catch (error) {
      console.error('Error al generar el informe de logins:', error);
    }
  }
}
