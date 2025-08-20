import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelPrincipalComponent } from './pages/panel-principal/panel-principal.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ListadoReparacionesComponent } from './listado-reparaciones/listado-reparaciones.component';
import { NuevaReparacionComponent } from './nueva-reparacion/nueva-reparacion.component';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { NuevoTelefonoComponent } from './nuevo-telefono/nuevo-telefono.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { TelefonosComponent } from './telefonos/telefonos.component';

const routes: Routes = [
  {
    path: '',
    component: PanelPrincipalComponent,
    children: [
      { path: 'clientes', component: ClientesComponent },
      { path: 'telefonos/:clienteId', component: TelefonosComponent },
      { path: 'reparaciones/:telefonoId', component: ReparacionesComponent },
      { path: 'nuevo-cliente', component: NuevoClienteComponent },
      { path: 'nuevo-telefono/:clienteId', component: NuevoTelefonoComponent },
      {
        path: 'nueva-reparacion/:telefonoId',
        component: NuevaReparacionComponent,
      },
      { path: 'listado-reparaciones', component: ListadoReparacionesComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioRoutingModule {}
