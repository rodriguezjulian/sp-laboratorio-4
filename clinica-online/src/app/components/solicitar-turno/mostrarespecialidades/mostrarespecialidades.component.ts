import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() especialista: any; // Receive the selected specialist from the parent
  @Output() selectEspecialidad = new EventEmitter<any>();

  especialidades: any[] = [];
  horariosDisponibles: { [key: string]: any[] } = {};
  diasDisponibles: string[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    console.log('Especialista recibido en MostrarEspecialidades:', this.especialista);
    this.loadEspecialidades();
  }

  async loadEspecialidades() {
    try {
      if (!this.especialista || !this.especialista.especialidad) {
        console.warn('Especialista o especialidades no disponibles');
        return;
      }

      const especialidadIds = this.especialista.especialidad;

      // Fetch all specialities and filter by the specialist's IDs
      const especialidadesSnapshot = await this.firestoreService.getCollection('especialidades');
      this.especialidades = especialidadesSnapshot
        .filter((especialidad: any) => especialidadIds.includes(especialidad.id))
        .map((especialidad: any) => ({
          id: especialidad.id,
          descripcion: especialidad.descripcion,
          urlFotoPerfil: especialidad.urlFotoPerfil || null,
        }));

      console.log('Especialidades cargadas:', this.especialidades);

    } catch (error) {
      console.error('Error al cargar las especialidades:', error);
    }
  }

  seleccionarEspecialidad(especialidad: any) {
    console.log('Especialidad seleccionada:', especialidad);
    this.selectEspecialidad.emit(especialidad); // Emit the selected speciality
  }
}
