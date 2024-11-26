import { AuthService } from './../../servicios/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from '../../servicios/firestore.service';
import { Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  msjError : string = "";
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
      nombre: 'Admin',
      correo: 'julianAdmin@gmail.com',
      contrasena: '12345678',
      imagen: 'https://firebasestorage.googleapis.com/v0/b/ppsutn-2ed7e.appspot.com/o/fotosperfil%2F1732605540296-illia.jpeg?alt=media&token=dcd34edb-55dc-4342-aefc-407790cde3cc',
    },
  ];

  constructor(private fb: FormBuilder, private auth : AuthService, private firestore : FirestoreService) {
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
      this.Login()
      //this.GuardarRegistroExitoso();
    } else {
      console.log('Formulario inválido');
    }
  }

  Login() {
    console.log("Entrando al login")
    this.auth.login(this.loginForm.get('correo')?.value, this.loginForm.get('contrasena')?.value).then((res) => {
      console.log("Parece que viene bien el login")
      this.GuardarRegistroExitoso();
    }).catch((e) => {
      switch(e.code) {
        case "auth/invalid-credential":
          this.msjError = "Email o contraseña incorrectos";
          break;
          case "auth/invalid-email":
            this.msjError = "EMAIL INCORRECTO.";
            break;
        default:
          this.msjError = "ERROR al ingresar sesion, verifique datos ingresados.";
          break;
      }
    });}

    async GuardarRegistroExitoso(){
      const newRegister = 
      { 
        usuario : this.loginForm.get('correo')?.value,
      };
      await this.firestore.createDocument('logueos', newRegister);
    }
}
