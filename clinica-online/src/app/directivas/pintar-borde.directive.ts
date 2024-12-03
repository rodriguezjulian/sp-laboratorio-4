import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPintarBorde]',
  standalone:true
})
export class PintarBordeDirective implements OnChanges {
  @Input() borde: boolean | null = null; // Recibe el estado del especialista

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.borde === true) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '6px solid green');
    } else if (this.borde === false) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '6px solid red');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
    }
  }
}
