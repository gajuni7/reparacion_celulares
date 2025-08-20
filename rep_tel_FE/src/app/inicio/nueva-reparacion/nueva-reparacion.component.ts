import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsService } from '../../shared/modals.service';
import { ApiService } from '../services/api.service';
import { map, switchMap } from 'rxjs';
import { Cliente } from '../../models/Cliente';
import { Telefono } from '../../models/Telefono';

@Component({
  selector: 'app-nueva-reparacion',
  templateUrl: './nueva-reparacion.component.html',
  styleUrl: './nueva-reparacion.component.scss'
})
export class NuevaReparacionComponent {
  reparacionForm!: FormGroup;
  estados: any[] = [];
  clienteId!: number;
  telefonoId!: number;

  cliente: Cliente | null = null;
  telefono: Telefono | null = null;

  private _costoNumValue: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalsService: ModalsService,
    private apiService: ApiService
  ) {
      this.reparacionForm = this.fb.group({
      descripcion: ['', Validators.required],
      estado_id: [null, Validators.required],
      costo: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteId = Number(params['clienteId']);
      this.telefonoId = Number(params['telefonoId']);
    });

    this._cargarEstados();
    this._cargarClienteTelefono();
  }

  guardarReparacion() {
    if (this.reparacionForm.invalid) return;

    const nuevaReparacion = this.reparacionForm.value
    nuevaReparacion.costo = this._costoNumValue;

    this.apiService.agregarNuevaReparacion(this.telefonoId, nuevaReparacion).subscribe({
      next: (res) => {
        this.modalsService
          .mostrarConfirmacion('Reparación creada correctamente', 'Éxito')
            .subscribe((confirmado) => {
              if (confirmado) {
                this.router.navigate(['/inicio/reparaciones', this.telefonoId]);
              }
            });
      },
      error: (err) => {
          const mensajeError = err?.error?.mensaje || 'Error al crear la reparación';
          this.modalsService.mostrarError(mensajeError);
      }
    });
  }

  public formatoDinero(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    const numericValue = Number(value);
    value = new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(numericValue);

    event.target.value = value;
    this._costoNumValue = numericValue
  }


  private _cargarEstados() {
    this.apiService.obtenerEstadosReparacion().subscribe((res: any) => {
      this.estados = res;
      const estadoInicial = this.estados.find(es=> es.id === 1);
      this.reparacionForm.get('estado_id')?.setValue(estadoInicial.id);
    });
  }

  private _cargarClienteTelefono() {
    this.route.params
      .pipe(
        map(params => ({ clienteId: Number(params['clienteId']), telefonoId: Number(params['telefonoId']) })),
        switchMap(({ clienteId, telefonoId }) =>
          this.apiService.obtenerClientePorId(clienteId).pipe(
            switchMap((cliente: any) =>
              this.apiService.obtenerTelefonoPorId(telefonoId).pipe(
                map((telefono: any) => ({ cliente, telefono }))
              )
            )
          )
        )
      )
      .subscribe({
        next: ({ cliente, telefono }) => {
          this.cliente = cliente;
          this.telefono = telefono;
        },
        error: err => {
          console.error('Error al obtener cliente o teléfono', err);
        }
      });
  }
}
