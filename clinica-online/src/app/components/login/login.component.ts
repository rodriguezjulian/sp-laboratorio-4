import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  usuariosRapidos = [
    {
      nombre: 'Paciente 1',
      correo: 'dominic@gmail.com',
      contrasena: '12345678',
      imagen: 'https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603765425-dominic.jpeg?alt=media&token=4011e3c4-f6df-4ef7-bf09-c4a70de63649',
    },
    {
      nombre: 'Paciente 2',
      correo: 'jordana@gmail.com',
      contrasena: '12345678',
      imagen: 'https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603941641-jordana.jpg?alt=media&token=74093de3-77e4-4c42-b98c-9af6c07515ac',
    },
    {
      nombre: 'Paciente 3',
      correo: 'hugh@gmail.com',
      contrasena: '12345678',
      imagen: 'https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732604105493-drHouse.jpeg?alt=media&token=081d7297-81a3-4be3-9dcd-12e90705978f',
    },
    {
      nombre: 'Especialista 1',
      correo: 'david@gmail.com',
      contrasena: '12345678',
      imagen: 'https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603526550-davo.jpeg?alt=media&token=4ef21d52-ea70-4ce6-a77a-dd20689c7fe0',
    },
    {
      nombre: 'Especialista 2',
      correo: 'messi@gmail.com',
      contrasena: '123456',
      imagen: 'https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732603014197-messi.jpg?alt=media&token=df6986b1-34b6-4014-b6cc-11e6deac5031',
    },
    {
      nombre: 'messi@gmail.com',
      correo: 'especialista2@mail.com',
      contrasena: '123456',
      imagen: 'https://example.com/especialista2.jpg',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  rellenarUsuario(usuario: any) {
    this.loginForm.setValue({
      correo: usuario.correo,
      contrasena: usuario.contrasena,
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Usuario logueado:', this.loginForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
