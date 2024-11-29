import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';
import { MostrarEspecialistasComponent } from '../mostrarespecialistas/mostrarespecialistas.component';
import { MostrarEspecialidadesComponent } from '../mostrarespecialidades/mostrarespecialidades.component';
import { SolicitarTurnoComponent } from '../solicitar-turno/solicitar-turno.component';

@Component({
  selector: 'app-parent-admin',
  templateUrl: './parent-admint.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ListaUsuariosComponent,
    MostrarEspecialistasComponent,
    MostrarEspecialidadesComponent,
    SolicitarTurnoComponent,
  ],
})
export class ParentAdminComponent {
  selectedPaciente: any = null;
  selectedEspecialista: any = null;
  selectedEspecialidad: any = null;

  showEspecialistas: boolean = false;
  showEspecialidades: boolean = false;

  onPacienteSelected(paciente: any) {
    this.selectedPaciente = paciente;
    console.log("paciente desde parent-admint :", paciente);
    this.showEspecialistas = true; 
  }

  onEspecialistaSelected(especialista: any) {
    this.selectedEspecialista = especialista;
    this.showEspecialidades = true;
  }

  onEspecialidadSelected(especialidad: any) {
    this.selectedEspecialidad = especialidad;
    this.showEspecialidades = false;
  }
}
