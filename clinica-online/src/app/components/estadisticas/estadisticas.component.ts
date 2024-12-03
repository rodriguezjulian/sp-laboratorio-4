import * as XLSX from 'xlsx';
import { FirestoreService } from '../../servicios/firestore.service'; // Ajusta la ruta de tu servicio
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { LoaderService } from '../../servicios/loader.service'
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  standalone: true,
  imports : [CommonModule ,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,]
})
export class EstadisticasComponent {
  constructor(private firestoreService: FirestoreService,public loader: LoaderService) {}
  barrasChart: Chart | undefined;
  turnos : any [] =[];
  cantidadDeTurnosPorEspecialidad: { [key: string]: number } = {};
  turnosFinalizadosPorMedicoChart: Chart | undefined; 
  
  tortaChart: Chart | undefined;
  
  cantidadDeTurnosFinalizadosPorMedico : Record<string, number> = {};
  FechaDesdeMedico: any;
  FechaHastaMedico: any;

  FechaDesdeMedicoDos: any;
  FechaHastaMedicoDos: any;
  cantidadDeTurnosPorMedicoEnPeriodo: Record<string, number> = {};
  turnosPorMedicoChart: Chart | undefined;

  cantidadDeTurnosPorDia: { [key: string]: number } = {};
  async ngOnInit() {
    this.loader.setLoader(true);
    await this.obtenerTurnosPorEspecialidad();
    await this.calcularTurnosPorDia();
    this.loader.setLoader(false);
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



    // Crear el gráfico
    this.crearGraficoTortaPorEspecialidad();
  }


  crearGraficoTurnosPorMedico() {
    if (Object.keys(this.cantidadDeTurnosPorMedicoEnPeriodo).length === 0) {
      console.warn('No hay datos para mostrar en el gráfico.');
      return;
    }
  
    console.log('Creando gráfico con los siguientes datos:', this.cantidadDeTurnosPorMedicoEnPeriodo);
  
    const labels = Object.keys(this.cantidadDeTurnosPorMedicoEnPeriodo);
    const data = Object.values(this.cantidadDeTurnosPorMedicoEnPeriodo);
  
    // Esperar a que el canvas esté en el DOM
    setTimeout(() => {
      const ctx = document.getElementById('turnosPorMedicoChart') as HTMLCanvasElement;
  
      if (!ctx) {
        console.error('No se encontró el canvas con ID turnosPorMedicoChart en el DOM.');
        return;
      }
  
      if (this.turnosPorMedicoChart) {
        this.turnosPorMedicoChart.destroy(); // Destruir el gráfico anterior si existe
      }
  
      this.turnosPorMedicoChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Turnos Solicitados',
              data: data,
              backgroundColor: '#36A2EB',
              borderColor: '#003F7D',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 18,
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 18,
                },
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  size: 18,
                },
              },
            },
          },
        },
      });
  
      console.log('Gráfico creado con éxito.');
    }, 100);
  }
  
  
  

  async MostrarTurnosPorMedico() {
    console.log("por aca");
    if (!this.FechaDesdeMedico || !this.FechaHastaMedico) {
      console.warn('Por favor, selecciona ambas fechas.');
      return;
    }
  
    const fechaDesde = new Date(this.FechaDesdeMedico).toISOString();
    const fechaHasta = new Date(this.FechaHastaMedico).toISOString();
  
    // Filtrar turnos en el rango de fechas
    this.turnos = await this.firestoreService.getTurnos();
    console.log("que vale this.turnos " ,this.turnos);

    const turnosEnPeriodo = this.turnos.filter((turno: any) => {
      const fechaTurno = turno.fecha; // La fecha ya está en formato cadena
      return fechaTurno >= fechaDesde && fechaTurno <= fechaHasta;
    });
  
    console.log('Turnos en el período:', turnosEnPeriodo);
  
    // Obtener los especialistas para mapear nombres
    const especialistas = await this.firestoreService.getEspecialistas();
    const especialistaMap: Record<string, { nombre: string; apellido: string }> = {};
  
    especialistas.forEach((especialista: any) => {
      especialistaMap[especialista.id] = {
        nombre: especialista.nombre,
        apellido: especialista.apellido,
      };
    });
  
    console.log('Mapa de especialistas:', especialistaMap);
  
    // Contar turnos por médico
    this.cantidadDeTurnosPorMedicoEnPeriodo = {};
    turnosEnPeriodo.forEach((turno: any) => {
      const uidEspecialista = turno.uidEspecialista;
      const especialista = especialistaMap[uidEspecialista];
  
      if (especialista) {
        const medicoNombre = `${especialista.nombre} ${especialista.apellido}`;
        if (!this.cantidadDeTurnosPorMedicoEnPeriodo[medicoNombre]) {
          this.cantidadDeTurnosPorMedicoEnPeriodo[medicoNombre] = 0;
        }
        this.cantidadDeTurnosPorMedicoEnPeriodo[medicoNombre]++;
      } else {
        console.warn(`No se encontró el especialista con UID: ${uidEspecialista}`);
      }
    });
  
    console.log(
      'Cantidad de turnos por médico en el período:',
      this.cantidadDeTurnosPorMedicoEnPeriodo
    );
  
    this.crearGraficoTurnosPorMedico();
  }
  

  
  exportarTurnosPorMedico() {
    const canvas = document.getElementById('turnosPorMedicoChart') as HTMLCanvasElement;
    if (!canvas) {
      console.warn('No se encontró el gráfico.');
      return;
    }
  
    const doc = new jsPDF();
    doc.text('Turnos Solicitados por Médico', 10, 10);
  
    const chartImage = canvas.toDataURL('image/png');
    doc.addImage(chartImage, 'PNG', 10, 20, 180, 100);
  
    doc.save('Turnos_Por_Medico.pdf');
  }
  
  
  descargarTortaPorEspecialidad() {
    const canvas = document.getElementById('tortaEspecialidadChart') as HTMLCanvasElement;
    if (!canvas) {
      console.warn('No se encontró el gráfico de torta.');
      return;
    }
  
    const doc = new jsPDF();
    doc.text('Gráfico de Turnos por Especialidad', 10, 10); // Título
  
    const chartImage = canvas.toDataURL('image/png');
    doc.addImage(chartImage, 'PNG', 10, 20, 180, 100); // Agrega el gráfico al PDF
  
    doc.save('Turnos_por_Especialidad.pdf');
  }
  
  descargarBarrasPorDia() {
    const canvas = document.getElementById('barrasDiaChart') as HTMLCanvasElement;
    if (!canvas) {
      console.warn('No se encontró el gráfico de barras.');
      return;
    }
  
    const doc = new jsPDF();
    doc.text('Gráfico de Turnos por Día', 10, 10); // Título
  
    const chartImage = canvas.toDataURL('image/png');
    doc.addImage(chartImage, 'PNG', 10, 20, 180, 100); // Agrega el gráfico al PDF
  
    doc.save('Turnos_por_Dia.pdf');
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
                  size: 24,
                },
              },
            },
            title: {
              display: true,
              text: 'Cantidad de Turnos por Especialidad',
              font: {
                size: 40,
              },
            },
          },
        },
      });
    }
  }


async calcularTurnosPorDia() {
  const turnos = await this.firestoreService.getTurnos();

  // Contar turnos por día
  turnos.forEach((turno: any) => {
    const fecha = turno.fecha; // Suponiendo que `fecha` es el campo con la cadena de la fecha
    if (!this.cantidadDeTurnosPorDia[fecha]) {
      this.cantidadDeTurnosPorDia[fecha] = 0;
    }
    this.cantidadDeTurnosPorDia[fecha]++;
  });

  console.log('Cantidad de turnos por día:', this.cantidadDeTurnosPorDia);

  // Crear el gráfico
  this.crearGraficoBarrasPorDia();
}
crearGraficoBarrasPorDia() {
  if (Object.keys(this.cantidadDeTurnosPorDia).length === 0) {
    console.warn('No hay datos para mostrar en el gráfico.');
    return;
  }

  const labels = Object.keys(this.cantidadDeTurnosPorDia); // Fechas
  const data = Object.values(this.cantidadDeTurnosPorDia); // Cantidades

  const ctx = document.getElementById('barrasDiaChart') as HTMLCanvasElement;
  if (ctx) {
    if (this.barrasChart) {
      this.barrasChart.destroy(); // Destruir gráfico previo si existe
    }

    this.barrasChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cantidad de Turnos por Día',
            data: data,
            backgroundColor: '#36A2EB',
            borderColor: '#003F7D',
            borderWidth: 1,
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

        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 18,
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 18,
              },
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

  async MostrarTurnosFinalizadosPorMedico() {
    if (!this.FechaDesdeMedicoDos || !this.FechaHastaMedicoDos) {
      console.warn('Por favor, selecciona ambas fechasAAAAAAAAAAAAAAAAAAAAAAAAAAAA.');
      return;
    }
  
    const fechaDesde = new Date(this.FechaDesdeMedicoDos).toISOString();
    const fechaHasta = new Date(this.FechaHastaMedicoDos).toISOString();
  
    // Filtrar turnos finalizados en el rango de fechas
    this.turnos = await this.firestoreService.getTurnos();
    const turnosFinalizados = this.turnos.filter((turno: any) => {
      const fechaTurno = turno.fecha;
      return (
        fechaTurno >= fechaDesde &&
        fechaTurno <= fechaHasta &&
        turno.estado === 'Realizado'
      );
    });
  
    // Obtener los especialistas para mapear nombres
    const especialistas = await this.firestoreService.getEspecialistas();
    const especialistaMap: Record<string, { nombre: string; apellido: string }> = {};
  
    especialistas.forEach((especialista: any) => {
      especialistaMap[especialista.id] = {
        nombre: especialista.nombre,
        apellido: especialista.apellido,
      };
    });
  
    // Contar turnos por médico
    this.cantidadDeTurnosFinalizadosPorMedico = {};
    turnosFinalizados.forEach((turno: any) => {
      const uidEspecialista = turno.uidEspecialista;
      const especialista = especialistaMap[uidEspecialista];
  
      if (especialista) {
        const medicoNombre = `${especialista.nombre} ${especialista.apellido}`;
        if (!this.cantidadDeTurnosFinalizadosPorMedico[medicoNombre]) {
          this.cantidadDeTurnosFinalizadosPorMedico[medicoNombre] = 0;
        }
        this.cantidadDeTurnosFinalizadosPorMedico[medicoNombre]++;
      } else {
        console.warn(`No se encontró el especialista con UID: ${uidEspecialista}`);
      }
    });
  
    console.log(
      'Cantidad de turnos finalizados por médico en el período:',
      this.cantidadDeTurnosFinalizadosPorMedico
    );
  
    this.crearGraficoTurnosFinalizadosPorMedico();
  }
  
  crearGraficoTurnosFinalizadosPorMedico() {
    if (Object.keys(this.cantidadDeTurnosFinalizadosPorMedico).length === 0) {
      console.warn('No hay datos para mostrar en el gráfico.');
      return;
    }
  
    const labels = Object.keys(this.cantidadDeTurnosFinalizadosPorMedico);
    const data = Object.values(this.cantidadDeTurnosFinalizadosPorMedico);
  
    setTimeout(() => {
      const ctx = document.getElementById('turnosFinalizadosPorMedicoChart') as HTMLCanvasElement;
  
      if (!ctx) {
        console.error('No se encontró el canvas con ID turnosFinalizadosPorMedicoChart en el DOM.');
        return;
      }
  
      if (this.turnosFinalizadosPorMedicoChart) {
        
        
      }
  
      this.turnosFinalizadosPorMedicoChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Turnos Finalizados',
              data: data,
              backgroundColor: [
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
                  size: 14,
                },
              },
            },
          },
        },
      });
  
      console.log('Gráfico de turnos finalizados creado con éxito.');
    }, 100);
  }
  exportarTurnosFinalizadosPorMedico() {
    const canvas = document.getElementById('turnosFinalizadosPorMedicoChart') as HTMLCanvasElement;
  
    if (!canvas) {
      console.warn('No se encontró el canvas del gráfico de turnos finalizados.');
      return;
    }
  
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'a4',
    });
  
    // Dimensiones de la página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
  
    // Título del PDF
    const title = 'Turnos Finalizados por Médico';
    doc.setFontSize(18);
    doc.text(title, margin, margin);
  
    // Calcular el tamaño ajustado del gráfico
    const chartWidth = pageWidth - margin * 2; // Ancho dentro del margen
    const chartHeight = (canvas.height / canvas.width) * chartWidth; // Mantener proporción
  
    // Verificar si el gráfico cabe en la página
    const maxHeight = pageHeight - margin * 2; // Altura disponible
    const finalHeight = chartHeight > maxHeight ? maxHeight : chartHeight; // Limitar altura
  
    // Centrar el gráfico verticalmente si sobra espacio
    const yPosition = (pageHeight - finalHeight) / 2;
  
    // Convertir el gráfico a imagen
    const chartImage = canvas.toDataURL('image/png');
  
    // Agregar el gráfico al PDF
    doc.addImage(chartImage, 'PNG', margin, yPosition, chartWidth, finalHeight);
  
    // Guardar el archivo
    doc.save('Turnos_Finalizados_Por_Medico.pdf');
  }
  
  
  
}
