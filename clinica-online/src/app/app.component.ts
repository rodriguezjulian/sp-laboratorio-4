import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import {CargaComponent} from './components/carga/carga.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule,CargaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clinica-online';
  usuarioLogueado: User | null = null;

  constructor(private auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.usuarioLogueado = user;
      console.log('Usuario actual:', user);
    });
  }
}
