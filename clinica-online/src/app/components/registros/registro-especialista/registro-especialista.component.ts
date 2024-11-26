import { AuthService } from './../../../servicios/auth.service';
import { ImagenService } from './../../../servicios/imagen.service'; 
import { FirestoreService } from './../../../servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';

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
  private file : any;

  constructor(private firestoreService: FirestoreService, private fb: FormBuilder,
    private authService : AuthService, private router: Router, private imagenService : ImagenService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      especialidad: ['', Validators.required],
      nuevaEspecialidad: [''], // Para agregar una especialidad personalizada
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      fotoPerfil: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    const auxiliar = await this.firestoreService.getEspecialidades();
    this.especialidades = auxiliar.map((especialidad: any) => especialidad.descripcion);
  }
  Home(){
    this.router.navigate(['']);
  }
  uploadImageUno(foto: any) {
    this.file = foto.target.files[0];
  }
  async agregarEspecialidad() {
    if(this.registroForm.get('nuevaEspecialidad')?.value  != "")
    {
      const newRegister = 
      { 
        descripcion : this.registroForm.get('nuevaEspecialidad')?.value 
      };
      await this.firestoreService.createDocument('especialidades', newRegister);
      const auxiliar = await this.firestoreService.getEspecialidades();
      this.especialidades = auxiliar.map((especialidad: any) => especialidad.descripcion);
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


 async onSubmit() {
  console.log("recien toque el boton");
    if (this.registroForm.valid) {
      console.log("previo a llamar a crearEspecialista()");
      await this.crearEspecialista();
      this.registroForm.reset();
    } else {
      Swal.fire(
        {
        title: 'ERROR', 
        html: 'Por favor verifica los datos ingresados.', 
        icon: 'error',
        didOpen: () => {
          document.documentElement.classList.remove('swal2-height-auto');
          document.body.classList.remove('swal2-height-auto');   
        }
      });
    }
  }
  async crearEspecialista() {
    console.log("antes de subir la imagen");
    let url = await this.imagenService.subirImg(this.file);
    console.log("despues de subir la img");
    const cliente = {
      nombre : this.registroForm.get('nombre')?.value,
      apellido : this.registroForm.get('apellido')?.value,
      edad : this.registroForm.get('edad')?.value,
      dni : this.registroForm.get('dni')?.value,
      especialidad : this.registroForm.get('especialidad')?.value,
      correo : this.registroForm.get('correo')?.value,
      contrasena : this.registroForm.get('contrasena')?.value,
      autorizado : "no",
      urlFotoPerfil : url
    };
    console.log("cree la constante del cliente");
    console.log(cliente);
    try {
      this.authService.createUser("especialista",cliente, this.registroForm.get('correo')?.value, this.registroForm.get('contrasena')?.value);
      Swal.fire({
        title: 'Especialista creado',
        text: '¡Ya puede empezar a usar nuestro sitio!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        backdrop: `rgba(0,0,0,0.8)`,
        didOpen: () => {
          document.documentElement.classList.remove('swal2-height-auto');
          document.body.classList.remove('swal2-height-auto');
        }
      });
      this.router.navigate(['/login']);
    } catch (error) {
      Swal.fire(
        {
        title: 'ERROR', 
        html: 'Por favor verifica los datos ingresados.', 
        icon: 'error',
        didOpen: () => {
          document.documentElement.classList.remove('swal2-height-auto');
          document.body.classList.remove('swal2-height-auto');   
        }
      });
    }
  }
}
