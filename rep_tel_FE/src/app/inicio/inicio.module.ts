import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Componentes
import { PanelPrincipalComponent } from './pages/panel-principal/panel-principal.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { NuevoTelefonoComponent } from './nuevo-telefono/nuevo-telefono.component';
import { NuevaReparacionComponent } from './nueva-reparacion/nueva-reparacion.component';
import { ListadoReparacionesComponent } from './listado-reparaciones/listado-reparaciones.component';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  declarations: [
    PanelPrincipalComponent,
    ClientesComponent,
    TelefonosComponent,
    ReparacionesComponent,
    NuevoClienteComponent,
    NuevoTelefonoComponent,
    NuevaReparacionComponent,
    ListadoReparacionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InicioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule
  ]
})
export class InicioModule {}
