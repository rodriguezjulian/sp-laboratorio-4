import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import * as XLSX from 'xlsx';
import {pasaPorArriba} from '../../directivas/app-tooltip-directive.directive'
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { LoaderService } from '../../servicios/loader.service'
import {PintarBordeDirective} from '../../directivas/pintar-borde.directive'

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss'],
  imports : [CommonModule,pasaPorArriba,PintarBordeDirective],
  standalone : true,
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('500ms ease-in', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'translateY(20px)', opacity: 0 }))
      ])
    ])
  ]

})
export class SeccionUsuariosComponent {
  pacientes: any[] = [];
  especialistas: any[] = [];
  turnos: any[] = []; 
  administradores: any[] = [];
  constructor(private router: Router,private firestoreService: FirestoreService,public loader: LoaderService) {}

  navigateTo(userType: string): void {
    switch (userType) {
      case 'paciente':
        this.router.navigate(['/registroPaciente']);
        break;
      case 'especialista':
        this.router.navigate(['/registroEspecialista']);
        break;
      case 'admin':
        this.router.navigate(['/registroAdmin']);
        break;
      default:
        console.error('Ruta no definida para:', userType);
    }
  }
  ngOnInit(): void {
    this.loader.setLoader(true);
    this.loadUsers();
    this.loadTurnos(); // Cargar los turnos desde la base de dato
    this.loader.setLoader(false);
  }

async verHistoria(paciente: any) {
  // Obtener turnos realizados
  const turnos = await this.firestoreService.getCollection('turnos', {
    where: [
      { field: 'uidPaciente', op: '==', value: paciente.id },
      { field: 'estado', op: '==', value: 'Realizado' },
    ],
  });

  console.log("Paciente seleccionado: ", paciente);
  console.log("Turnos obtenidos: ", turnos);

  const historial: any[] = [];

  turnos.forEach((turno: any) => {
    const dataAMostar: any = {
      fecha: turno.fecha || 'N/A',
      estado: turno.estado || 'N/A',
      diagnostico: turno.diagonostico || 'N/A',
      altura: turno.historiaClinica?.altura || 'N/A',
      peso: turno.historiaClinica?.peso || 'N/A',
      presion: turno.historiaClinica?.presion || 'N/A',
      temperatura: turno.historiaClinica?.temperatura || 'N/A',
      dato1: turno.historiaClinica?.datosDinamicos?.[0]
        ? `${turno.historiaClinica.datosDinamicos[0].clave ?? "N/A"} ${turno.historiaClinica.datosDinamicos[0].valor ?? "N/A"}`
        : "N/A",
      dato2: turno.historiaClinica?.datosDinamicos?.[1]
        ? `${turno.historiaClinica.datosDinamicos[1].clave ?? "N/A"} ${turno.historiaClinica.datosDinamicos[1].valor ?? "N/A"}`
        : "N/A",
      dato3: turno.historiaClinica?.datosDinamicos?.[2]
        ? `${turno.historiaClinica.datosDinamicos[2].clave ?? "N/A"} ${turno.historiaClinica.datosDinamicos[2].valor ?? "N/A"}`
        : "N/A",
    };

    historial.push(dataAMostar);
  });

  const tableRows = historial
    .map(
      (entry) => `
      <tr>
        <td>${entry.fecha}</td>
        <td>${entry.estado}</td>
        <td>${entry.diagnostico}</td>
        <td>${entry.altura}</td>
        <td>${entry.peso}</td>
        <td>${entry.presion}</td>
        <td>${entry.temperatura}</td>
        <td>${entry.dato1}</td>
        <td>${entry.dato2}</td>
        <td>${entry.dato3}</td>
      </tr>
    `
    )
    .join('');

  const tableHTML = `
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; table-layout: fixed;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="min-width: 100px;">Fecha</th>
            <th style="min-width: 100px;">Estado</th>
            <th style="min-width: 200px;">Diagnóstico</th>
            <th style="min-width: 100px;">Altura</th>
            <th style="min-width: 100px;">Peso</th>
            <th style="min-width: 100px;">Presión</th>
            <th style="min-width: 120px;">Temperatura</th>
            <th style="min-width: 200px;">Dato 1</th>
            <th style="min-width: 200px;">Dato 2</th>
            <th style="min-width: 200px;">Dato 3</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;

  Swal.fire({
    title: 'Historia Clínica',
    html: tableHTML,
    width: '1500px', // Aumenta el ancho del modal
    showCloseButton: true,
    confirmButtonText: 'Cerrar',
    scrollbarPadding: false,
  });
}

  async toggleHabilitado(especialista: any) {
    especialista.habilitado = !especialista.habilitado;
    try {
      await this.firestoreService.updateDocument(`especialista/${especialista.id}`, {
        habilitado: especialista.habilitado,
      });
      console.log('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  }
  async loadTurnos() {
    try {
      this.turnos = await this.firestoreService.getCollection('turnos'); // Suponiendo que la colección se llama 'turnos'
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
    }
  }

  async descargarTurnosPaciente(paciente: any) {
    // Filtrar los turnos del paciente seleccionado
    const turnosDelPaciente = this.turnos.filter(
      (turno) => turno.uidPaciente === paciente.id
    );

    if (turnosDelPaciente.length === 0) {
      console.warn('No se encontraron turnos para este paciente.');
      return;
    }
    /*console.log("por aca ",turnosDelPaciente.uidEspecialista);
    return;*/

    const especialidades = await this.firestoreService.getEspecialidades();
    const especialistas = await this.firestoreService.getEspecialistas();

    turnosDelPaciente.forEach(turno => {
      let descripcionEspecialidad ;
      let nombreEspecialista;
      especialidades.forEach(especialidad => {
        if(turno.uidEspecialidad == especialidad.id)
        {
          descripcionEspecialidad =  especialidad.descripcion;
        }
      });
      especialistas.forEach(especialista => {
        if(turno.uidEspecialista == especialista.id)
          {
            nombreEspecialista = `${especialista.nombre} ${especialista.apellido}`;
          }
      });
      turno.especialidadNombre = descripcionEspecialidad;
      turno.especialistaNombre = nombreEspecialista;

    });

    // Formatear los datos para el archivo Excel
    const data = turnosDelPaciente.map((turno) => ({
      Fecha: turno.fecha,
      Hora: `${turno.desde} - ${turno.hasta}`,
      Especialista: `${turno.especialistaNombre}`,
      Especialidad: turno.especialidadNombre,
      Estado: turno.estado,
    }));

    // Crear el archivo Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TurnosPaciente');
    XLSX.writeFile(
      wb,
      `Turnos_${paciente.nombre}_${paciente.apellido}.xlsx`
    );
  }

  async loadUsers() {
    try {
      this.pacientes = await this.firestoreService.getPacientes();
      this.especialistas = await this.firestoreService.getEspecialistas();
      this.administradores = await this.firestoreService.getAdministradores();
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }

  exportarUsuariosExcel() {
    const data: any[] = [];

    // Pacientes
    data.push(['Pacientes']);
    data.push(['Nombre', 'Apellido', 'Correo', 'DNI', 'Edad', 'Obra Social']);
    this.pacientes.forEach((paciente) => {
      data.push([
        paciente.nombre,
        paciente.apellido,
        paciente.correo,
        paciente.dni,
        paciente.edad,
        paciente.obraSocial || 'N/A',
      ]);
    });

    data.push([]);
    // Especialistas
    data.push(['Especialistas']);
    data.push(['Nombre', 'Apellido', 'Correo', 'DNI', 'Edad', 'Especialidades', 'Habilitado']);
    this.especialistas.forEach((especialista) => {
      data.push([
        especialista.nombre,
        especialista.apellido,
        especialista.correo,
        especialista.dni,
        especialista.edad,
        especialista.especialidades,
        especialista.habilitado ? 'Sí' : 'No',
      ]);
    });

    data.push([]);
    // Administradores
    data.push(['Administradores']);
    data.push(['Nombre', 'Apellido', 'Correo', 'DNI', 'Edad']);
    this.administradores.forEach((admin) => {
      data.push([
        admin.nombre,
        admin.apellido,
        admin.correo,
        admin.dni,
        admin.edad,
      ]);
    });

    // Generar el archivo Excel
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  }
}
