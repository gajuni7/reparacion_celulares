import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./autenticacion/autenticacion.module').then(
        (m) => m.AutenticacionModule
      ),
  },
  {
    path: 'inicio',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioModule),
  },
  { path: '**', redirectTo: '' },
];
