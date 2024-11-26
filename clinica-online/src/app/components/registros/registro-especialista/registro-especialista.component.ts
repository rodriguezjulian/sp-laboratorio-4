import { FirestoreService } from './../../../servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss'],
  standalone : true,
  imports : [ReactiveFormsModule,CommonModule]
})
export class RegistroEspecialistaComponent implements OnInit {
  especialidades: string[] = [''];
  registroForm: FormGroup;
  imagenPerfil: string | null = null;

  constructor(private firestoreService: FirestoreService, private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      especialidad: ['', Validators.required],
      nuevaEspecialidad: [''], // Para agregar una especialidad personalizada
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      imagenPerfil: ['', Validators.required],
    });
  }

  async ngOnInit() {
    const auxiliar = await this.firestoreService.getEspecialidades();
    this.especialidades = auxiliar.map((especialidad: any) => especialidad.descripcion);
  }

  async agregarEspecialidad() {
    if(this.registroForm.get('nuevaEspecialidad')?.value  != "")
    {
      const newRegister = 
      { 
        descripcion : this.registroForm.get('nuevaEspecialidad')?.value 
      };
      await this.firestoreService.createDocument('especialidades', newRegister);
      Swal.fire(
        {
        title: 'Especilidad creada', 
        html: 'Gracias por contribuir a nuestra base de datos.', 
        icon: 'success',
        didOpen: () => {
          document.documentElement.classList.remove('swal2-height-auto');
          document.body.classList.remove('swal2-height-auto');   
        }
      });
    }
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      console.log('Datos del especialista:', this.registroForm.value);
      alert('Registro exitoso');
      this.registroForm.reset();
    } else {
      alert('Formulario no válido, por favor revisa los campos.');
    }
  }
}
