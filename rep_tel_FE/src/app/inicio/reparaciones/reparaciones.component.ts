import { Component } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { Telefono } from '../../models/Telefono';
import { ReparacionDetalle } from '../../models/Reparacion';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ModalsService } from '../../shared/modals.service';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrl: './reparaciones.component.scss',
})
export class ReparacionesComponent {
  cliente: Cliente | null = null;
  telefono: Telefono | null = null;
  reparaciones: ReparacionDetalle[] = [];
  displayedColumns: string[] = [
    'creado_en',
    'estado',
    'descripcion',
    'costo',
    'reparado_en',
  ];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          return Number(params.get('telefonoId'));
        })
      )
      .subscribe({
        next: (telefonoId: number) => {
          this.api.listarReparacionesPorTelefono(telefonoId).subscribe({
            next: (reparaciones) => {
              this.reparaciones = reparaciones;
              this.cliente = reparaciones?.length
                ? (reparaciones[0].cliente as Cliente)
                : null;
              this.telefono = reparaciones?.length
                ? (reparaciones[0].telefono as Telefono)
                : null;
            },
            error: (err) => {
              const mensajeError =
                err?.error?.mensaje || 'Error al obtener clientes';
              this.modalsService.mostrarError(mensajeError);
            },
          });
        },
      });
  }
}
