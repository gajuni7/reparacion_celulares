import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalsService } from '../../shared/modals.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.scss'
})
export class NuevoClienteComponent {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private modalsService: ModalsService,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['',[Validators.email]],
      telefono: ['',[Validators.pattern('^[0-9]*$')]],
    });
  }

  guardarCliente() {
    if (this.clienteForm.valid) {
      this.api.crearCliente(this.clienteForm.value).subscribe({
        next: () => {
          this.modalsService
            .mostrarConfirmacion('Cliente creado con éxito', 'Éxito')
            .subscribe((confirmado) => {
              if (confirmado) {
                this.router.navigate(['/inicio/clientes']);
              }
            });
        },
        error: (err) => {
          const mensajeError =
            err?.error?.mensaje || 'Ocurrió un error al crear el cliente';
          this.modalsService.mostrarError(mensajeError);
        },
      });
    } else {
      this.modalsService.mostrarError('Por favor completa todos los campos correctamente');
    }
  }
}
