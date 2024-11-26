import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./components/bienvenida/bienvenida.component').then((m) => m.BienvenidaComponent),
  },

];