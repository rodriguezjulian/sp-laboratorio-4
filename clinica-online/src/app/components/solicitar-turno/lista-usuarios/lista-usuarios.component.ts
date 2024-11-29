import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../../servicios/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  imports : [CommonModule],
  standalone: true,
})
export class ListaUsuariosComponent implements OnInit {
  pacientes: any[] = []; 
  @Output() selectPaciente = new EventEmitter<any>();

  constructor(private firestoreService: FirestoreService) {}

  async ngOnInit() {
    await this.cargarPacientes();
  }
  async cargarPacientes() {
    try {
      this.pacientes = await this.firestoreService.getCollection('paciente');
    } catch (error) {
      console.error('Error al cargar los pacientes:', error);
    }
  }

  seleccionarPaciente(paciente: any) {
    this.selectPaciente.emit(paciente);
  }
}
