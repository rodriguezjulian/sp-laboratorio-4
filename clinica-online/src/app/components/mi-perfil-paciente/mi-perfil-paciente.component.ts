import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { FirestoreService } from '../../servicios/firestore.service';

@Component({
  selector: 'app-mi-perfil-paciente',
  templateUrl: './mi-perfil-paciente.component.html',
  styleUrls: ['./mi-perfil-paciente.component.scss'],
  standalone: true,
})
export class MiPerfilPacienteComponent implements OnInit {
  paciente: any = {}; // Objeto para almacenar los datos del paciente logueado

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
    } catch (error) {
      console.error('Error al obtener los datos del paciente:', error);
    }
  }
}
