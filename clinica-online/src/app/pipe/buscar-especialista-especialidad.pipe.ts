import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarEspecialistaEspecialidad',
  standalone: true, // Convertido a standalone
})
export class BuscarEspecialistaEspecialidadPipe implements PipeTransform {
  transform(turnos: any[], buscar: string): any[] {
    if (!buscar) return turnos;
    const lowerBuscar = buscar.toLowerCase();
    return turnos.filter((turno) =>
      turno.especialista.nombre.toLowerCase().includes(lowerBuscar) ||
      turno.especialista.apellido.toLowerCase().includes(lowerBuscar) ||
      turno.especialidad.toLowerCase().includes(lowerBuscar)
    );
  }
}

