import { Component, OnInit} from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';

@Component({
  selector: 'app-gestion-horarios',
  templateUrl: './gestion-horarios.component.html',
  styleUrls: ['./gestion-horarios.component.scss'],
  standalone : true,
  imports : [CommonModule]
})
export class GestionHorariosComponent implements OnInit {
  especialista: any;
  especialidades: any[] = [];
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  turnos: string[] = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
  ];
  horariosPorDia: any = {};
  huboCambios: boolean = false;
  usuarioLogueado: User | null = null;

  constructor(private firestoreService: FirestoreService,  private auth: Auth) {}


  async ngOnInit() {
    // Esperar a que el estado de autenticación se determine
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
  
        // Ejecutar las funciones después de obtener el usuario logueado
        await this.cargarEspecialista();
        await this.cargarEspecialidades();
      } else {
        this.usuarioLogueado = null;
        console.error('No hay usuario logueado');
      }
    });
  }
  

  async cargarEspecialista() {
    // Verificar que el usuario está logueado
    if (!this.usuarioLogueado) {
      console.error('No hay usuario logueado.');
      return;
    }
  
    // Obtener el UID del especialista logueado
    let uid = this.usuarioLogueado.uid;
    console.log("UID del especialista logueado: ", uid);
  
    // Obtener información del especialista desde Firestore
    const especialistaDoc = await this.firestoreService.getDocument<any>(`especialista/${uid}`);
    this.especialista = especialistaDoc.exists() ? especialistaDoc.data() : null;
  
    if (this.especialista?.horarios) {
      this.horariosPorDia = this.especialista.horarios;
    }
  
    console.log('Especialista cargado:', this.especialista);
  }
  
  async cargarEspecialidades() {
    if (!this.especialista?.especialidad) {
      console.error('El especialista no tiene especialidades asignadas.');
      return;
    }
  
    // Obtener los UIDs de las especialidades del especialista
    const especialidadIds = this.especialista.especialidad; // Array de UIDs
  
    // Cargar solo las especialidades que corresponden a los UIDs
    const especialidadesSnapshot = await this.firestoreService.getDocuments<any>('especialidades');
    const todasEspecialidades = especialidadesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    // Filtrar especialidades asignadas al especialista
    this.especialidades = todasEspecialidades.filter((especialidad) =>
      especialidadIds.includes(especialidad.id)
    );
  
    console.log('Especialidades del especialista:', this.especialidades);
  }
  

  seleccionarEspecialidad(dia: string, event: any) {
    const especialidadId = event.target.value;
    this.horariosPorDia[dia] = this.horariosPorDia[dia] || {};
    this.horariosPorDia[dia].especialidad = especialidadId;
    this.huboCambios = true;
  }

  cambiarHorario(dia: string, tipo: string, event: any) {
    const horario = event.target.value;
    this.horariosPorDia[dia] = this.horariosPorDia[dia] || {};
    this.horariosPorDia[dia][tipo] = horario;
    this.huboCambios = true;
  }

  async guardarCambios() {
    try {
      await this.firestoreService.updateDocument(`especialista/${this.especialista.id}`, {
        horarios: this.horariosPorDia,
      });
      this.huboCambios = false;
      alert('Horarios guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Hubo un problema al guardar los cambios');
    }
  }
}
