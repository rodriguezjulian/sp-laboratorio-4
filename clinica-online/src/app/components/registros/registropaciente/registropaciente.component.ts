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
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from '../../../servicios/firestore.service';
@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registropaciente.component.html',
  styleUrls: ['./registropaciente.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RecaptchaModule,RecaptchaFormsModule],
})
export class RegistroPacienteComponent implements OnInit {
  registroForm: FormGroup;
  private file1: any;
  private file2: any;
  token:boolean = false;
  public msjError : string = "";
  usuarioLogueado: User | null = null;
  proximaRuta : string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private auth: Auth, private firestoreService : FirestoreService,
    private router: Router, private imagenService : ImagenService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      obraSocial: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      fotoPerfilUno: ['', [Validators.required]],
      fotoPerfilDos: ['', [Validators.required]],
    });
  }

  async ngOnInit()
  {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.usuarioLogueado = user;
      } else {
        this.usuarioLogueado = null;
      }
    });
  }

  async onSubmit() {
    if(this.usuarioLogueado!=null)
    {
      let uid = this.usuarioLogueado.uid;
      console.log(uid);
     
      let usuarioLogueado : any = await this.firestoreService.getUsuarioInfo(uid);
      this.proximaRuta = "/home"
      console.log(usuarioLogueado.correo);
      console.log(usuarioLogueado.contrasena);
    }
    for (const field in this.registroForm.controls) {
      const control = this.registroForm.get(field);
      if (control?.invalid) {
        
        this.msjError = `Campo inválido: ${field}`;
        console.log(`Campo inválido: ${field}`, control.errors);
        return;
      }
    }
    if (this.registroForm.valid) {
      console.log("antes de llamar a crearpaciente()")
      await this.crearPaciente();
    } else {
      Swal.fire({
        title: 'ERROR',
        html: 'Por favor verifica los datos ingresados.',
        icon: 'error',
        didOpen: () => {
          document.documentElement.classList.remove('swal2-height-auto');
          document.body.classList.remove('swal2-height-auto');
        },
      });
    }
  }
  SeccionUsuarios()
  {
    this.router.navigate(['/seccionUsuarios']);
  }
  Home(){
    this.router.navigate(['']);
  }
  uploadImageUno(foto: any) {
    this.file1 = foto.target.files[0];
  }

  executeRecaptchaVisible(token:any){
    this.token = !this.token;
  }

  uploadImageDos(foto: any) {
    this.file2 = foto.target.files[0];
  }
  async crearPaciente() {

    let url1 = await this.imagenService.subirImg(this.file1);
    let url2 = await this.imagenService.subirImg(this.file2);
    const paciente = {
      nombre: this.registroForm.get('nombre')?.value,
      apellido: this.registroForm.get('apellido')?.value,
      edad: this.registroForm.get('edad')?.value,
      dni: this.registroForm.get('dni')?.value,
      obraSocial: this.registroForm.get('obraSocial')?.value,
      correo: this.registroForm.get('correo')?.value,
      contrasena: this.registroForm.get('contrasena')?.value,
      autorizado : "no",
      urlFotoPerfil : url1,
      urlFotoPerfilDos : url2,
      rol : "paciente"
    };

    try {
      console.log("por crear paciente")

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
          this.registroForm.reset();
          Swal.fire({
            title: 'Paciente registrado',
            text: '¡Ya puede empezar a usar nuestro sitio!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            backdrop: `rgba(0,0,0,0.8)`,
            didOpen: () => {
              document.documentElement.classList.remove('swal2-height-auto');
              document.body.classList.remove('swal2-height-auto');
            },
          });
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
      Swal.fire({
        title: 'ERROR',
        html: 'Hubo un problema al registrar al paciente.',
        icon: 'error',
        didOpen: () => {
          document.documentElement.classList.remove('swal2-height-auto');
          document.body.classList.remove('swal2-height-auto');
        },
      });
    }
  }
}
