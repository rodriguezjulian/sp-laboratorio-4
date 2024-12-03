import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../servicios/loader.service'

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

  constructor(private firestoreService: FirestoreService,public loader: LoaderService) {}

  async ngOnInit() {
    this.loader.setLoader(true);

    await this.cargarPacientes();
    this.loader.setLoader(false);
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
