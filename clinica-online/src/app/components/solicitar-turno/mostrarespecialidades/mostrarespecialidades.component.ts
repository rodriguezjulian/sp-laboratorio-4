import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-mostrar-especialidades',
  templateUrl: './mostrarespecialidades.component.html',
  styleUrls: ['./mostrarespecialidades.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MostrarEspecialidadesComponent implements OnInit {
  especialistaSeleccionado: any;
  especialidades: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadEspecialidades();
  }

  async loadEspecialidades() {
    const especialistaId = this.route.snapshot.paramMap.get('id');
    if (especialistaId) {
      try {
        // Obtener el especialista y sus especialidades
        const especialistaDoc = await this.firestoreService.getDocument<any>(`especialista/${especialistaId}`);
        this.especialistaSeleccionado = especialistaDoc.data();
  
        if (this.especialistaSeleccionado?.especialidad) {
          const especialidadIds = this.especialistaSeleccionado.especialidad; // Array de IDs de especialidades
          this.especialidades = [];
  
          for (const id of especialidadIds) {
            const especialidadDoc = await this.firestoreService.getDocument<any>(`especialidades/${id}`);
            const especialidadData = especialidadDoc.exists() ? especialidadDoc.data() : null;
          
            if (especialidadData) {
              console.log("Especialidad cargada:", especialidadData.descripcion, especialidadData.urlFotoPerfil);
              this.especialidades.push(especialidadData);
            }
          }
          
        }
      } catch (error) {
        console.error('Error al cargar las especialidades:', error);
      }
    } else {
      console.warn('ID del especialista no encontrado en la ruta');
    }
  }
  
  seleccionarEspecialidad(especialidad: any) {
    console.log('Especialidad seleccionada:', especialidad);
    // Navegar o realizar acción según la especialidad seleccionada
  }
}
