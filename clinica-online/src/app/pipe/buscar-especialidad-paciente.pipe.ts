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
      turno.paciente.nombre.toLowerCase().includes(lowerBuscar) ||
      turno.paciente.apellido.toLowerCase().includes(lowerBuscar) ||
      turno.especialidad.toLowerCase().includes(lowerBuscar)
    );
  }
}
