import { Component, OnInit, Output,Input} from '@angular/core';
import { FirestoreService } from '../../../servicios/firestore.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-mostrar-especialistas',
  templateUrl: './mostrarespecialistas.component.html',
  styleUrls: ['./mostrarespecialistas.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('1000ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1000ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class MostrarEspecialistasComponent implements OnInit {
  especialistas: any[] = [];
  @Output() selectEspecialista = new EventEmitter<any>();

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
    console.log('Especialista seleccionado:', especialista);
    this.selectEspecialista.emit(especialista);
  }
  

  
}
