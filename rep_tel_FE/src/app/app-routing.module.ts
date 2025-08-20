import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./autenticacion/autenticacion.module').then(
        (m) => m.AutenticacionModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
