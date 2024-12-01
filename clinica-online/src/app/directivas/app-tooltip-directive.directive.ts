import { Directive, Input, ElementRef, Renderer2, HostListener, Injectable } from '@angular/core';

@Directive({
  selector: '[pasaPorArriba]',
  standalone:true
})
@Injectable({ providedIn: 'root' })
export class pasaPorArriba {
  @Input('pasaPorArriba') tooltipText: string = ''; // Texto del tooltip
  private tooltipElement: HTMLElement | null = null; // Referencia al tooltip

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) {
      return;
    }

    // Crear el tooltip
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', '#ff0000');
    this.renderer.setStyle(this.tooltipElement, 'color', '#ffffff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '8px 12px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '8px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '14px');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1050');
    this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0px 4px 6px rgba(0, 0, 0, 0.2)');
    this.renderer.setStyle(this.tooltipElement, 'border', '1px solid #cc0000');
    
    

    // Posición relativa al elemento
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const top = hostPos.top - 30; // Ajustar según sea necesario
    const left = hostPos.left + hostPos.width / 2;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);

    // Agregar el tooltip al body
    this.renderer.appendChild(document.body, this.tooltipElement);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}