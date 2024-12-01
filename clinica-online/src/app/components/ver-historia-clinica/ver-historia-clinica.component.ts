import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ver-historia-clinica',
  templateUrl: './ver-historia-clinica.component.html',
  styleUrls: ['./ver-historia-clinica.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class VerHistoriaClinicaComponent {
  @Input() paciente: any; // Paciente con su historia clínica
  @Output() cerrarModal = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    console.log('Desde ver historia clínica', this.paciente?.historiaClinica);
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}
