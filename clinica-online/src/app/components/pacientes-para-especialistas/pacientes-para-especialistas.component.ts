import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../servicios/auth.service'
import { VerHistoriaClinicaComponent } from '../ver-historia-clinica/ver-historia-clinica.component'
@Component({
  selector: 'app-pacientes-para-especialistas',
  templateUrl: './pacientes-para-especialistas.component.html',
  styleUrls: ['./pacientes-para-especialistas.component.scss'],
  standalone: true,
  imports : [CommonModule,VerHistoriaClinicaComponent]
})
export class PacientesParaEspecialistasComponent implements OnInit {

   @Input() pacientes: any[] = [];
  especialistaLogueado: any;
  pacienteSeleccionado: any = null;

  constructor(private firestoreService: FirestoreService, private auth: AuthService) {}

  async ngOnInit() {
    try {
      // Obtener especialista logueado
      this.especialistaLogueado = await this.auth.obtenerUsuarioActual();
      console.log("Especialista logueado en este momento", this.especialistaLogueado.uid);
  
      // Obtener turnos realizados
      const turnos = await this.firestoreService.getCollection('turnos', {
        where: [
          { field: 'uidEspecialista', op: '==', value: this.especialistaLogueado.uid },
          { field: 'estado', op: '==', value: 'Realizado' },
        ],
      });
  
      console.log("Turnos obtenidos: ", turnos);
  
      // Obtener todos los pacientes
      const todosPacientes = await this.firestoreService.getPacientes();
  
      const pacientesMap: { [key: string]: any } = {};
  
      turnos.forEach((turno: any) => {
        if (!pacientesMap[turno.uidPaciente]) {
          // Buscar los datos del paciente en todosPacientes
          const pacienteData = todosPacientes.find(
            (paciente: any) => paciente.id === turno.uidPaciente
          );
  
          pacientesMap[turno.uidPaciente] = {
            ...pacienteData, // Agregar los datos encontrados del paciente
            ultimosTurnos: [],
            historiaClinica: [], // Inicializar como un array
          };
        }
  
        // Agregar el turno a los últimos turnos
        pacientesMap[turno.uidPaciente].ultimosTurnos.push({
          fecha: turno.fecha,
          desde: turno.desde,
        });
  
        // Agregar la historia clínica al array (si existe)
        if (turno.historiaClinica) {
          pacientesMap[turno.uidPaciente].historiaClinica.push({
            fecha: turno.fecha,
            ...turno.historiaClinica,
          });
        }
      });
  
      console.log("Pacientes map: ", pacientesMap);
  
      // Convertir el mapa a una lista ordenada por último turno
      this.pacientes = Object.values(pacientesMap).map((paciente: any) => {
        // Ordenar últimos turnos por fecha
        paciente.ultimosTurnos = paciente.ultimosTurnos
          .sort(
            (a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
          )
          .slice(0, 3); // Mostrar solo los últimos tres turnos
  
        // Ordenar historias clínicas por fecha (opcional, para consistencia)
        if (paciente.historiaClinica) {
          paciente.historiaClinica.sort(
            (a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
          );
        }
  
        return paciente;
      });
  
      console.log("Pacientes cargados: ", this.pacientes);
    } catch (error) {
      console.error('Error al cargar los pacientes:', error);
    }
  }
  

  verHistoriaClinica(paciente: any) {
    this.pacienteSeleccionado = paciente; // Pasar datos al componente modal
  }
  cerrarHistoriaClinica() {
    this.pacienteSeleccionado = null; // Cerrar modal
  }
}
