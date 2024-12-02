import * as XLSX from 'xlsx';
import { FirestoreService } from '../../servicios/firestore.service'; // Ajusta la ruta de tu servicio
import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  standalone : true
})
export class EstadisticasComponent {
  constructor(private firestoreService: FirestoreService) {}

  async descargarLogins() {
    try {
      // Obtener los logins desde Firestore
      const logins = await this.firestoreService.getCollection('logueos');
      if (!logins || logins.length === 0) {
        console.warn('No se encontraron registros de logins.');
        return;
      }

      // Formatear los datos para el archivo Excel
      const data = logins.map((login: any) => ({
        Usuario: login.usuario,
        Fecha: login.creado.toDate().toLocaleDateString(), // Convierte la marca de tiempo a fecha
        Hora: login.creado.toDate().toLocaleTimeString(), // Convierte la marca de tiempo a hora
      }));

      // Crear el archivo Excel
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Logins');
      XLSX.writeFile(wb, 'Logins_Usuarios.xlsx');
    } catch (error) {
      console.error('Error al generar el informe de logins:', error);
    }
  }
}
