import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[EstadoTurnoColor]',
  standalone: true,
})
export class EstadoTurnoColorDirective implements OnChanges {
  @Input() EstadoTurnoColor: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.updateColor();
  }

  private updateColor() {
    let color = '';

    switch (this.EstadoTurnoColor.toLowerCase()) {
      case 'pendiente':
        color = 'orange';
        break;
      case 'cancelado':
        color = 'red';
        break;
      case 'realizado':
        color = 'green';
        break;
      case 'rechazado':
        color = 'gray';
        break;
      default:
        color = 'black';
    }

    this.el.nativeElement.style.color = color;
  }
}
