import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarPacienteEspecialidad',
  standalone: true, // Convertido a standalone
})
export class BuscarPacienteEspecialidadPipe implements PipeTransform {
  transform(turnos: any[], buscar: string): any[] {
    if (!buscar) return turnos;
    const lowerBuscar = buscar.toLowerCase();

    return turnos.filter((turno) => {
      // Filtrar por nombre o especialidad
      const matchesNombre = turno.nombre.toLowerCase().includes(lowerBuscar);
      const matchesEspecialidad = turno.especialidad.toLowerCase().includes(lowerBuscar);

      // Filtrar por datosDinamicos
      const matchesDatosDinamicos = turno.historiaClinica?.datosDinamicos?.some((dato: any) => 
        dato.clave.toLowerCase().includes(lowerBuscar) || 
        dato.valor.toLowerCase().includes(lowerBuscar)
      );

      return matchesNombre || matchesEspecialidad || matchesDatosDinamicos;
    });
  }
}
