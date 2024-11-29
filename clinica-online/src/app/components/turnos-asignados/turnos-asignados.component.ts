import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../servicios/firestore.service';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turnos-asignados',
  templateUrl: './turnos-asignados.component.html',
  styleUrls: ['./turnos-asignados.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TurnosAsignadosComponent implements OnInit {
  usuarioLogueado: User | null = null;
  turnosAsignados: { [key: string]: any[] } = {}; // Turnos organizados por día
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  constructor(private firestoreService: FirestoreService, private auth: Auth) {}

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.usuarioLogueado = user;
        await this.cargarTurnosAsignados();
      } else {
        Swal.fire('Error', 'Debe iniciar sesión para ver los turnos asignados.', 'error');
      }
    });
  }

  async cargarTurnosAsignados() {
    if (!this.usuarioLogueado) {
      return;
    }

    try {
      // Obtener el especialista logueado
      const especialistaDoc = await this.firestoreService.getDocument<any>(`especialista/${this.usuarioLogueado.uid}`);
      const especialista = especialistaDoc.exists() ? especialistaDoc.data() : null;

      if (!especialista) {
        Swal.fire('Error', 'No se pudo cargar el perfil del especialista.', 'error');
        return;
      }

      // Consultar los turnos asignados al especialista
      const turnosSnapshot = await this.firestoreService.getCollection('turnos', {
        where: [{ field: 'uidEspecialista', op: '==', value: this.usuarioLogueado.uid }],
      });

      const turnos = turnosSnapshot.map((doc: any) => doc);

      // Agrupar los turnos por día
      this.dias.forEach((dia) => {
        this.turnosAsignados[dia] = turnos.filter((turno: any) => turno.dia === dia);
      });
    } catch (error) {
      console.error('Error al cargar turnos asignados:', error);
      Swal.fire('Error', 'Hubo un problema al cargar los turnos asignados.', 'error');
    }
  }
}
