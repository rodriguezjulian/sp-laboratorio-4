import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter,SimpleChanges  } from '@angular/core';
import {ReemplazarNulosPipe} from '../../pipe/reemplazar-nulos.pipe'

@Component({
  selector: 'app-ver-historia-clinica',
  templateUrl: './ver-historia-clinica.component.html',
  styleUrls: ['./ver-historia-clinica.component.scss'],
  standalone: true,
  imports : [CommonModule,ReemplazarNulosPipe]
})
export class VerHistoriaClinicaComponent {
  @Input() paciente: any; // Paciente con su historia clínica
  @Output() cerrarModal = new EventEmitter<void>();
  datosDinamicosProcesados: string[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paciente'] && changes['paciente'].currentValue) {
      this.procesarDatosDinamicos();
    }
  }

  async ngOnInit() {
    console.log("Desde ver historia clinica", this.paciente);

    // Procesar los datos dinámicos


    console.log("Datos dinámicos procesados:", this.datosDinamicosProcesados);
  }
procesarDatosDinamicos()
{
  this.datosDinamicosProcesados = this.paciente.historiaClinica.map((historias: any) =>
    historias.datosDinamicos.map(
      (historia: any) => `${historia.clave}: ${historia.valor}`
    )
  );
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
