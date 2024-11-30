import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarPacienteEspecialidad',
  standalone: true, // Convertido a standalone
})
export class BuscarPacienteEspecialidadPipe implements PipeTransform {
  transform(turnos: any[], buscar: string): any[] {
    if (!buscar) return turnos;
    const lowerBuscar = buscar.toLowerCase();
    return turnos.filter((turno) =>
      turno.nombre.toLowerCase().includes(lowerBuscar) ||
      turno.especialidad.toLowerCase().includes(lowerBuscar)
    );
  }
}
