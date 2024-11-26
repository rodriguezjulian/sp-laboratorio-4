import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./components/bienvenida/bienvenida.component').then((m) => m.BienvenidaComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registroEspecialista',
    loadComponent: () => import('./components/registros/registro-especialista/registro-especialista.component').then((m) => m.RegistroEspecialistaComponent),
  },
  {
    path: 'registroAdmin',
    loadComponent: () => import('./components/registros/registro-admin/registro-admin.component').then((m) => m.RegistroAdminComponent),
  },
  {
    path: 'registroPaciente',
    loadComponent: () => import('./components/registros/registropaciente/registropaciente.component').then((m) => m.RegistroPacienteComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
  },
];