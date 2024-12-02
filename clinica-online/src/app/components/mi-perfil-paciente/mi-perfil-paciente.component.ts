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
  especialidades: string[] =[];// Ejemplo
  especialidadSeleccionada: string | null = null;
  turnosConEspecialidad: any[] = [];

  constructor(
    private auth: AuthService,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit() {
    try {
      // Obtener el usuario logueado
      const usuarioLogueado = await this.auth.obtenerUsuarioActual();
      console.log('Usuario logueado:', usuarioLogueado);

      // Obtener los datos del paciente desde Firestore
      const pacienteDoc = await this.firestoreService.getDocument(
        `paciente/${usuarioLogueado?.uid}`
      );
      this.paciente = pacienteDoc.exists() ? pacienteDoc.data() : {};
      console.log('Datos del paciente:', this.paciente);

      const turnos = await this.firestoreService.getTurnos({
        where: [
          { field: 'uidPaciente', op: '==', value: this.paciente.id },
          { field: 'estado', op: '==', value: 'Realizado' },
        ],
      });
      const especialidadesSet = new Set<string>();
      turnos.forEach((turno: any) => {
        if (turno.uidEspecialidad) {
          especialidadesSet.add(turno.uidEspecialidad);
        }
      });
  
      // Convertir Set a Array
      const aux = Array.from(especialidadesSet);
      const especias = await this.firestoreService.getEspecialidades();
      const especialidad = new Set<string>();

      aux.forEach(element => {
        especias.forEach(especia => {
          if(element == especia.id )
            {
              console.log("entre??");
              especialidad.add(especia.descripcion)
            }
        });
      });

      this.especialidades =  Array.from(especialidad);
      console.log("aca ,", this.especialidades	)
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
      console.log("especialidad uid" ,especialidadUID );
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
      console.log("a ver que turnos aparecen : ", turnos);
     
      const doc = new jsPDF();
  
      // Encabezado
      doc.setFontSize(16);
      doc.text('Historia Clínica', 20, 20);
      doc.setFontSize(12);
      doc.text(`Paciente: ${this.paciente.nombre} ${this.paciente.apellido}`, 20, 30);
      doc.text(`Especialidad: ${this.especialidadSeleccionada}`, 20, 40);
      doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 20, 50);
  
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
        startY: 60,
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
