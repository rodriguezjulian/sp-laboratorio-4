import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocultarPrimeras',
  standalone: true,
})
export class OcultarPrimerasPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length < 4) {
      return value;
    }

    const oculto = value.slice(0, 4).replace(/./g, '*');
    return oculto + value.slice(4);
  }
}
