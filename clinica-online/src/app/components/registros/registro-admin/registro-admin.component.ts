import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ImagenService } from '../../../servicios/imagen.service';
import { AuthService } from '../../../servicios/auth.service';
import { RecaptchaModule } from 'ng-recaptcha';
@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RecaptchaModule],
})
export class RegistroAdminComponent implements OnInit {
  registroForm: FormGroup;
  private file: any;
  public showCaptchaError : boolean = false;
  public captcha: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private imagenService: ImagenService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      fotoPerfil: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
    this.showCaptchaError = false;
  }

  ngOnInit(): void {}
  
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
        console.log(`Campo inválido: ${field}`, control.errors);
      }
    }
    
    if (this.registroForm.valid) {
        await this.crearAdministrador();
      this.registroForm.reset();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor verifica los datos ingresados.',
        icon: 'error',
      });
    }
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

      await this.authService.createUser(
        'administrador',
        admin,
        admin.correo,
        admin.contrasena
      );

      Swal.fire({
        title: 'Administrador creado',
        text: '¡Ya puede iniciar sesión!',
        icon: 'success',
      });
      this.router.navigate(['/login']);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al crear el administrador.',
        icon: 'error',
      });
    }
  }
}
