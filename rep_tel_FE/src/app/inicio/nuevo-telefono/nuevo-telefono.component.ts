import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsService } from '../../shared/modals.service';
import { ApiService } from '../services/api.service';
import { map, switchMap } from 'rxjs';
import { Cliente } from '../../models/Cliente';

@Component({
  selector: 'app-nuevo-telefono',
  templateUrl: './nuevo-telefono.component.html',
  styleUrl: './nuevo-telefono.component.scss',
})
export class NuevoTelefonoComponent {
  telefonoForm: FormGroup;
  cliente!: Cliente;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private modalsService: ModalsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.telefonoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      imei: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('clienteId'))),
        switchMap((clienteId) => this.api.obtenerClientePorId(clienteId))
      )
      .subscribe({
        next: (cliente) => {
          this.cliente = cliente;
        },
        error: (err) => {
          const mensajeError =
            err?.error?.mensaje || 'Error al obtener datos del cliente';
          this.modalsService.mostrarError(mensajeError);
        },
      });
  }

  guardarTelefono() {
    if (this.telefonoForm.invalid) {
      this.telefonoForm.markAllAsTouched();
      return;
    }

    this.api.agregarTelefonoACliente(this.cliente.id, this.telefonoForm.value).subscribe({
      next: () => {
        this.modalsService
          .mostrarConfirmacion('Telefono creado con éxito', 'Éxito')
          .subscribe((confirmado) => {
            if (confirmado) {
              this.router.navigate(['/inicio/telefonos/', this.cliente.id]);
            }
          });
      },
      error: (err) => {
        const mensajeError =
          err?.error?.mensaje || 'Ocurrió un error al crear el cliente';
        this.modalsService.mostrarError(mensajeError);
      },
    });
  }
}
