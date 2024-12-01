import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, signOut, User } from '@angular/fire/auth';
import { AuthService } from './../../servicios/auth.service'; 
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('rotateZoom', [
      transition(':enter', [
        style({ transform: 'scale(0.5) rotate(-90deg)', opacity: 0 }),
        animate(
          '1000ms ease-in-out',
          style({ transform: 'scale(1) rotate(0)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        animate(
          '1000ms ease-in-out',
          style({ transform: 'scale(0.5) rotate(90deg)', opacity: 0 })
        )
      ])
    ])
  ]
  
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
