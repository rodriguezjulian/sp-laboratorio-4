import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { FirestoreService } from '../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-mi-perfil-paciente',
  templateUrl: './mi-perfil-paciente.component.html',
  styleUrls: ['./mi-perfil-paciente.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Agregar FormsModule
})
export class MiPerfilPacienteComponent implements OnInit {
  paciente: any = {}; // Objeto para almacenar los datos del paciente logueado
  clavesDinamicas: string[] = []; // Arreglo para las claves dinámicas
  especialidades: string[] =[];// Ejemplo
  especialidadSeleccionada: string | null = null;
  turnosConEspecialidad: any[] = [];
  historiaClinicaCompleta: any[] = []; // Agrega esta propiedad
  constructor(
    private auth: AuthService,
    private firestoreService: FirestoreService
  ) {}

  
  async ngOnInit() {
    try {
      // Obtener el usuario logueado
      const usuarioLogueado = await this.auth.obtenerUsuarioActual();
      const pacienteDoc = await this.firestoreService.getDocument(
        `paciente/${usuarioLogueado?.uid}`
      );
      this.paciente = pacienteDoc.exists() ? pacienteDoc.data() : {};

      // Cargar historia clínica completa
      const turnos = await this.firestoreService.getTurnos({
        where: [
          { field: 'uidPaciente', op: '==', value: this.paciente.id },
          { field: 'estado', op: '==', value: 'Realizado' },
        ],
      });
  
      this.historiaClinicaCompleta = turnos.map((turno: any) => {
        const datosDinamicos = turno.historiaClinica?.datosDinamicos || []; // Default to an empty array
        
        const datosDinamicosObj = datosDinamicos.reduce((acc: any, item: any) => {
          acc[item.clave] = `${item.clave} ${item.valor}`  || 'N/A';
          

          return acc;
        }, {});
        
        console.log("datos dinamicos", datosDinamicosObj);

        return {
          fecha: turno.fecha || 'N/A',
          altura: turno.historiaClinica?.altura || 'N/A',
          peso: turno.historiaClinica?.peso || 'N/A',
          presion: turno.historiaClinica?.presion || 'N/A',
          temperatura: turno.historiaClinica?.temperatura || 'N/A',
          datosDinamicos: datosDinamicosObj,
        };
      });
  
      // Obtener todas las claves dinámicas únicas
      const allClavesDinamicas = turnos
        .flatMap((turno: any) =>
          turno.historiaClinica?.datosDinamicos?.map((d: any) => d.clave) || []
        );
      this.clavesDinamicas = Array.from(new Set(allClavesDinamicas));

      console.log("claves dinamicas" , this.clavesDinamicas);
  
    } catch (error) {
      console.error('Error al obtener los datos del paciente:', error);
    }
  }

  async descargarHistoriaClinica() {
    if (!this.especialidadSeleccionada) {
      console.warn('Debe seleccionar una especialidad.');
      return;
    }
  
    const especialidades = await this.firestoreService.getEspecialidades();
    const especialidad = especialidades.find(
      (esp) => esp.descripcion === this.especialidadSeleccionada
    );
    if (!especialidad) {
      console.warn('Especialidad seleccionada no encontrada.');
      return;
    }
    const especialidadUID = especialidad.id;
  
    try {
      const turnos = await this.firestoreService.getTurnos({
        where: [
          { field: 'uidPaciente', op: '==', value: this.paciente.id },
          { field: 'estado', op: '==', value: 'Realizado' },
          { field: 'uidEspecialidad', op: '==', value: especialidadUID },
        ],
      });
  
      if (turnos.length === 0) {
        console.warn('No se encontraron turnos para la especialidad seleccionada.');
        return;
      }
  
      const doc = new jsPDF();
  
      // **Agregar el logo**
      const logo = 'data:image/png;data:image/png;base64,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'; // Reemplaza esto con tu Base64
      doc.addImage(logo, 'PNG', 10, 10, 30, 30); // (x, y, ancho, alto)
  
      // **Agregar encabezado debajo del logo**
      doc.setFontSize(16);
      doc.text('Historia Clínica', 50, 20); // Ajustar coordenadas para no solapar el logo
      doc.setFontSize(12);
      doc.text(`Paciente: ${this.paciente.nombre} ${this.paciente.apellido}`, 20, 50);
      doc.text(`Especialidad: ${this.especialidadSeleccionada}`, 20, 60);
      doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 20, 70);
  
      // Tabla de datos
      autoTable(doc, {
        head: [['Fecha', 'Altura (cm)', 'Peso', 'Presión', 'Temperatura (°C)']],
        body: turnos.map((turno: any) => [
          turno.fecha || 'N/A',
          turno.historiaClinica?.altura || 'N/A',
          turno.historiaClinica?.peso || 'N/A',
          turno.historiaClinica?.presion || 'N/A',
          turno.historiaClinica?.temperatura || 'N/A',
        ]),
        startY: 80,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [100, 100, 255] },
      });
  
      // Guardar el PDF
      doc.save(
        `historia_clinica_${this.especialidadSeleccionada.replace(/\s+/g, '_')}.pdf`
      );
    } catch (error) {
      console.error('Error al descargar la historia clínica:', error);
    }
  }
  
  
  
}
