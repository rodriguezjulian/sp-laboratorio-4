import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarEspecialistasComponent } from '../mostrarespecialistas/mostrarespecialistas.component';
import { MostrarEspecialidadesComponent } from '../mostrarespecialidades/mostrarespecialidades.component';
import { SolicitarTurnoComponent } from '../solicitar-turno/solicitar-turno.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent-component.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MostrarEspecialistasComponent,
    MostrarEspecialidadesComponent,
    SolicitarTurnoComponent,
  ],
})
export class ParentComponent {
  selectedEspecialista: any = null;
  selectedEspecialidad: any = null;
  showEspecialidades: boolean = false; // Track visibility

  onEspecialistaSelected(especialista: any) {
    this.selectedEspecialista = especialista;
    this.showEspecialidades = true; // Show specialties
  }

  onEspecialidadSelected(especialidad: any) {
    this.selectedEspecialidad = especialidad;
    this.showEspecialidades = false; // Hide specialties after selection
  }
}
