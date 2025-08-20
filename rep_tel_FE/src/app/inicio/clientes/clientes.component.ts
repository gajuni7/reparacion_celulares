import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../models/Cliente';
import { ApiService } from '../services/api.service';
import { ModalsService } from '../../shared/modals.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private router: Router, private apiService: ApiService, private modalsService: ModalsService) {}

  ngOnInit(): void {
    this.apiService.obtenerClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => {
              const mensajeError =
          err?.error?.mensaje || 'Error al obtener clientes';
        this.modalsService.mostrarError(mensajeError);
      }
    });
  }

  verTelefonos(clienteId: number): void {
    this.router.navigate(['/inicio/telefonos', clienteId]);
  }
}
