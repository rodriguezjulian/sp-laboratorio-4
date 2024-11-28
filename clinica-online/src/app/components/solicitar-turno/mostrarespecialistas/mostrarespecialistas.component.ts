import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-especialistas',
  templateUrl: './mostrarespecialistas.component.html',
  styleUrls: ['./mostrarespecialistas.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MostrarEspecialistasComponent implements OnInit {
  especialistas: any[] = [];

  constructor(private firestoreService: FirestoreService, private router: Router) {}

  ngOnInit(): void {
    this.loadEspecialistas();
  }

  async loadEspecialistas() {
    try {
      this.especialistas = await this.firestoreService.getEspecialistas();
    } catch (error) {
      console.error('Error al cargar los especialistas:', error);
    }
  }
  seleccionarEspecialista(especialista: any) {
    this.router.navigate(['/mostrarEspecialidades', especialista.id]);
  }
  
}
