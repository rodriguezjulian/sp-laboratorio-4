import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ImagenService } from '../../../servicios/imagen.service';
import { AuthService } from '../../../servicios/auth.service';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha-18";
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from '../../../servicios/firestore.service';
@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RecaptchaModule,RecaptchaFormsModule],
})
export class RegistroAdminComponent implements OnInit {
  registroForm: FormGroup;
  private file: any;
  public showCaptchaError : boolean = false;
  public captcha: string = '';
  token:boolean = false;
  public msjError : string = "";
  usuarioLogueado: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private imagenService: ImagenService,
    private auth: Auth,
    private firestore : FirestoreService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      fotoPerfil: ['', Validators.required],
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
  
  Home(){
    this.router.navigate(['']);
  }
  uploadImageUno(foto: any) {
    this.file = foto.target.files[0];
  }

  async onSubmit() {
    for (const field in this.registroForm.controls) {
      const control = this.registroForm.get(field);
      if (control?.invalid) {
        
        this.msjError = `Campo inválido: ${field}`;
        console.log(`Campo inválido: ${field}`, control.errors);
      }
    }
    
    if (this.registroForm.valid) {
      if(this.token)
        {
          await this.crearAdministrador();
          this.registroForm.reset();
        }else
        {
          Swal.fire({
            title: 'Error',
            text: 'Verifica que no es un robot para continuar',
            icon: 'error',
          });
          return;
        }

    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor verifica los datos ingresados.',
        icon: 'error',
      });
    }
  }

  executeRecaptchaVisible(token:any){
    this.token = !this.token;
  }

  SeccionUsuarios()
  {
    this.router.navigate(['/seccionUsuarios']);
  }

  async crearAdministrador() {
    try {
      console.log("dentro de crear Admin")
      let url = await this.imagenService.subirImg(this.file);
      console.log("ya subi la img " + url)
      const admin = {
        nombre: this.registroForm.get('nombre')?.value,
        apellido: this.registroForm.get('apellido')?.value,
        edad: this.registroForm.get('edad')?.value,
        dni: this.registroForm.get('dni')?.value,
        correo: this.registroForm.get('correo')?.value,
        contrasena: this.registroForm.get('contrasena')?.value,
        urlFotoPerfil: url,
      };


      let uid = this.usuarioLogueado!.uid;
      let usuarioLogueado : any = await this.firestore.getUsuarioInfo(uid);
      await this.authService.createUser(
        'administrador',
        admin,
        admin.correo,
        admin.contrasena,
        usuarioLogueado.correo,
        usuarioLogueado.contrasena
      );

      Swal.fire({
        title: 'Administrador creado',
        text: '¡Ya puede iniciar sesión!',
        icon: 'success',
      });
      if(this.usuarioLogueado == null)
      {
        this.router.navigate(['/login']);
      }
      else
      {
        this.router.navigate(['/home']);
      }
      
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al crear el administrador.',
        icon: 'error',
      });
    }
  }
}
