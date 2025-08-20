import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./autenticacion/autenticacion.module').then(
        (m) => m.AutenticacionModule
      ),
  },
  { path: '**', redirectTo: '' },
];
