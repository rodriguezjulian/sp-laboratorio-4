import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:'reemplazarNulos',
  standalone: true,
})
export class ReemplazarNulosPipe implements PipeTransform {
  transform(valor: any, reemplazo: string = 'N/A'): any {
    return valor ?? reemplazo;
  }
}
