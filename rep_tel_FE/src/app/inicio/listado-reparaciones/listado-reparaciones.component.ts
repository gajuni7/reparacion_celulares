import { Component } from '@angular/core';
import { ReparacionDetalle } from '../../models/Reparacion';
import { Router } from '@angular/router';
import { ModalsService } from '../../shared/modals.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-listado-reparaciones',
  templateUrl: './listado-reparaciones.component.html',
  styleUrl: './listado-reparaciones.component.scss'
})
export class ListadoReparacionesComponent {
  reparacionesDetalle: ReparacionDetalle[] = [];

  constructor( private apiService: ApiService, private modalsService: ModalsService) {}

  ngOnInit(): void {
    this.apiService.listarReparacionesDetalle().subscribe({
      next: (data) => this.reparacionesDetalle = data,
      error: (err) => {
              const mensajeError =
          err?.error?.mensaje || 'Error al obtener clientes';
        this.modalsService.mostrarError(mensajeError);
      }
    });
  }
}
