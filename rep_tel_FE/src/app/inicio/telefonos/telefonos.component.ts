import { Component } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Telefono } from '../../models/Telefono';
import { map, switchMap } from 'rxjs';
import { ModalsService } from '../../shared/modals.service';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrl: './telefonos.component.scss'
})
export class TelefonosComponent {
  cliente!: Cliente;
  telefonos: Telefono[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService, private modalsService: ModalsService) {}

ngOnInit(): void {
  this.route.paramMap
    .pipe(
      map(params => Number(params.get('clienteId'))),
      switchMap(clienteId =>
        this.api.obtenerClientePorId(clienteId).pipe(
          switchMap(cliente => {
            this.cliente = cliente;
            return this.api.obtenerTelefonosPorCliente(clienteId);
          })
        )
      )
    )
    .subscribe({
      next: (telefonos) => {
        this.telefonos = telefonos;
      },
      error: (err) => {
        const mensajeError = err?.error?.mensaje || 'Error al obtener datos del cliente';
        this.modalsService.mostrarError(mensajeError);
      }
    });
}

}
