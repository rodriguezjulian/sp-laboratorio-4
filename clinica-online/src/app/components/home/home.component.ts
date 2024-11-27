import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, signOut, User } from '@angular/fire/auth';
import { AuthService } from './../../servicios/auth.service'; 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

constructor(private auth: AuthService) {
}
  ngOnInit() 
  {
    console.log("por aqui");
    const test = this.auth.obtenerUsuarioActual();
    if(test !=null )

    { 
      console.log('UID:', test.uid);
      console.log('Correo:', test.email);
      console.log( "se reconoce el logueo " );
    }
    else
    {
      console.log("no se reconoce al logueo");
    }
  }
}
