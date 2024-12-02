import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarEspecialistaEspecialidad',
  standalone: true, // Convertido a standalone
})
export class BuscarEspecialistaEspecialidadPipe implements PipeTransform {
  transform(turnos: any[], buscar: string): any[] {
    if (!buscar) return turnos;
    const lowerBuscar = buscar.toLowerCase();

    return turnos.filter((turno) => {
      // Filtrar por nombre del paciente
      const matchesNombre = turno.especialista.nombre?.toLowerCase().includes(lowerBuscar);
      const matchesApellido = turno.especialista.apellido?.toLowerCase().includes(lowerBuscar);

      // Filtrar por especialidad
      const matchesEspecialidad = turno.especialidad?.toLowerCase().includes(lowerBuscar);
      const matchAltura = turno.historiaClinica?.altura.toLowerCase().includes(lowerBuscar);
      const peso  = turno.historiaClinica?.peso.toLowerCase().includes(lowerBuscar);
      const presion  = turno.historiaClinica?.presion.toLowerCase().includes(lowerBuscar);
      const temperatura  = turno.historiaClinica?.temperatura.toLowerCase().includes(lowerBuscar);
      // Filtrar por datosDinamicos en historia clínica
      const matchesDatosDinamicos = turno.historiaClinica?.datosDinamicos?.some((dato: any) => 
        dato.clave?.toLowerCase().includes(lowerBuscar) || 
        dato.valor?.toLowerCase().includes(lowerBuscar)
      );

      // Combinación de criterios
      return matchesNombre || matchesApellido || matchesEspecialidad || matchesDatosDinamicos || matchAltura || peso || presion || temperatura;;
    });
  }
}

