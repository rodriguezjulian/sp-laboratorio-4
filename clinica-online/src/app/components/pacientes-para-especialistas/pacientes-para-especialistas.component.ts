import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../servicios/auth.service'

@Component({
  selector: 'app-pacientes-para-especialistas',
  templateUrl: './pacientes-para-especialistas.component.html',
  styleUrls: ['./pacientes-para-especialistas.component.scss'],
  standalone: true,
  imports : [CommonModule]
})
export class PacientesParaEspecialistasComponent implements OnInit {
  pacientes: any[] = [];
  especialistaLogueado: any;

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

      console.log("Como trajo los turnos ", turnos);
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
            historiaClinica: turno.historiaClinica || null,
          };
        }
        pacientesMap[turno.uidPaciente].ultimosTurnos.push({
          fecha: turno.fecha,
          desde: turno.desde,
        });
      });
      
      console.log("Pacientes map ", pacientesMap);

      // Convertir el mapa a una lista ordenada por último turno
      this.pacientes = Object.values(pacientesMap).map((paciente: any) => {
        paciente.ultimosTurnos = paciente.ultimosTurnos
          .sort(
            (a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
          )
          .slice(0, 3); // Mostrar solo los últimos tres turnos
        return paciente;
      });
      
    } catch (error) {
      console.error('Error al cargar los pacientes:', error);
      Swal.fire('Error', 'No se pudieron cargar los pacientes.', 'error');
    }
  }

  verHistoriaClinica(paciente: any) {
    Swal.fire({
      title: 'Historia Clínica',
      html: `
        <p><strong>Altura:</strong> ${paciente.historiaClinica.altura || 'N/A'}</p>
        <p><strong>Peso:</strong> ${paciente.historiaClinica.peso || 'N/A'}</p>
        <p><strong>Presión:</strong> ${
          paciente.historiaClinica.presion || 'N/A'
        }</p>
        <p><strong>Temperatura:</strong> ${
          paciente.historiaClinica.temperatura || 'N/A'
        }</p>
      `,
      icon: 'info',
    });
  }
}
