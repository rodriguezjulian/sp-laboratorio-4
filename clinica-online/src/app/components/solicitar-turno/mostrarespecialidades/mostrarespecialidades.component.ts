import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-mostrar-especialidades',
  templateUrl: './mostrarespecialidades.component.html',
  styleUrls: ['./mostrarespecialidades.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('zoomInFade', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'scale(1)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        animate(
          '450ms ease-in',
          style({ transform: 'scale(0.5)', opacity: 0 })
        )
      ])
    ])
  ]
  
})
export class MostrarEspecialidadesComponent implements OnInit {
  @Input() especialista: any;
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
