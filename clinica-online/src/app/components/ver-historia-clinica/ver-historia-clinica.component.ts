import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ver-historia-clinica',
  templateUrl: './ver-historia-clinica.component.html',
  styleUrls: ['./ver-historia-clinica.component.scss'],
  standalone: true,
  imports : [CommonModule]
})
export class VerHistoriaClinicaComponent {
  @Input() paciente: any; // Paciente con su historia clínica
  @Output() cerrarModal = new EventEmitter<void>();

  async ngOnInit() {

    console.log("Desde ver historia clinica " ,  this.paciente);
   // console.log("Desde ver historia clinica " ,  this.paciente.historiaClinica.datosDinamicos); 

    this.paciente.historiaClinica.forEach((historias: any) => {
      historias.datosDinamicos.forEach((historia: any) => {
        console.log(`esto: ${historia.clave} ${historia.valor}`);
      });
    });
  }
  cerrar() {
      this.cerrarModal.emit();
  }
  pacienteSeleccionado: any = null;

verHistoriaClinica(paciente: any) {
  this.pacienteSeleccionado = paciente;
}

cerrarHistoriaClinica() {
  this.pacienteSeleccionado = null;
}

}
