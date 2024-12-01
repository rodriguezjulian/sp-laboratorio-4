import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import * as XLSX from 'xlsx';
import {pasaPorArriba} from '../../directivas/app-tooltip-directive.directive'
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss'],
  imports : [CommonModule,pasaPorArriba],
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
  constructor(private router: Router,private firestoreService: FirestoreService) {}

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
    this.loadUsers();
    this.loadTurnos(); // Cargar los turnos desde la base de dato
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
