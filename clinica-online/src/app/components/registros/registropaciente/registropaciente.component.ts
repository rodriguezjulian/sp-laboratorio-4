import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import { ImagenService } from './../../../servicios/imagen.service'; 
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha-18";
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { FirestoreService } from '../../../servicios/firestore.service';
import { LoaderService } from '../../../servicios/loader.service'


@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registropaciente.component.html',
  styleUrls: ['./registropaciente.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RecaptchaModule, RecaptchaFormsModule],
})
export class RegistroPacienteComponent implements OnInit {
  registroForm: FormGroup;
  private file1: any;
  private file2: any;
  token: boolean = false;
  usuarioLogueado: User | null = null;
  proximaRuta : string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private auth: Auth, 
    private firestoreService: FirestoreService,
    private router: Router, 
    private imagenService: ImagenService,public loader: LoaderService
  ) {
    // Configuración del formulario con validaciones
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      obraSocial: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      fotoPerfilUno: ['', Validators.required],
      fotoPerfilDos: ['', Validators.required],
    });
  }

  async ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.usuarioLogueado = user || null;
    });
  }

  // Función para verificar errores en un campo
  hasError(controlName: string, errorName: string): boolean {
    const control = this.registroForm.get(controlName);
    return !!control && control.hasError(errorName) && (control.dirty || control.touched);
  }
  

  uploadImageUno(foto: any) {
    this.file1 = foto.target.files[0];
  }

  uploadImageDos(foto: any) {
    this.file2 = foto.target.files[0];
  }

  async onSubmit() {
    this.loader.setLoader(true);
    if(this.usuarioLogueado!=null)
      {
        let uid = this.usuarioLogueado.uid;
        console.log(uid);
       
        let usuarioLogueado : any = await this.firestoreService.getUsuarioInfo(uid);
        this.proximaRuta = "/home"
        console.log(usuarioLogueado.correo);
        console.log(usuarioLogueado.contrasena);
      }
    if (this.registroForm.invalid) {
      Swal.fire({
        title: 'Verifique datos ingresados',
        text: '¡Tenga en cuenta cumplir con las normas.!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    await this.crearPaciente();
    this.loader.setLoader(false);
  }

  async crearPaciente() {
    try {
      const url1 = await this.imagenService.subirImg(this.file1);
      const url2 = await this.imagenService.subirImg(this.file2);

      const paciente = {
        nombre: this.registroForm.get('nombre')?.value,
        apellido: this.registroForm.get('apellido')?.value,
        edad: this.registroForm.get('edad')?.value,
        dni: this.registroForm.get('dni')?.value,
        obraSocial: this.registroForm.get('obraSocial')?.value,
        correo: this.registroForm.get('correo')?.value,
        contrasena: this.registroForm.get('contrasena')?.value,
        autorizado: "no",
        urlFotoPerfil: url1,
        urlFotoPerfilDos: url2,
        rol: "paciente"
      };
      if(this.token)
      {
        if(this.usuarioLogueado!=null)
          {
            let uid = this.usuarioLogueado.uid;
            let usuarioLogueado : any = await this.firestoreService.getUsuarioInfo(uid);
            await this.authService.createUser(
              'paciente',
              paciente,
              this.registroForm.get('correo')?.value,
              this.registroForm.get('contrasena')?.value,usuarioLogueado.correo,usuarioLogueado.contrasena
            );
          }else
          {
            console.log("lo creo sin estar logueado")
            await this.authService.createUser(
              'paciente',
              paciente,
              this.registroForm.get('correo')?.value,
              this.registroForm.get('contrasena')?.value
            );
          }
  
        Swal.fire({
          title: 'Paciente registrado',
          text: '¡Ya puede empezar a usar nuestro sitio!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
  
        this.registroForm.reset();
        this.router.navigate([this.proximaRuta]);
      }
      else
      {
        Swal.fire({
          title: 'Error',
          text: 'Verifica que no es un robot para continuar',
          icon: 'error',
        });
      }
      
    } catch (error) {
      console.error('Error al registrar paciente:', error);
    }
  }

  executeRecaptchaVisible(token:any){
    this.token = !this.token;
  }
}
