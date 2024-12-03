import { Component } from '@angular/core';
import {LoaderService} from '../../servicios/loader.service'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-carga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carga.component.html',
  styleUrl: './carga.component.css'
})
export class CargaComponent {
  constructor(public loader: LoaderService) { }
}
