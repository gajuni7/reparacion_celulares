import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControlOptions,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { ModalsService } from '../../../shared/modals.service';

@Component({
  selector: 'app-registra-usuario',
  templateUrl: './registra-usuario.component.html',
  styleUrls: ['./registra-usuario.component.scss'],
})
export class RegistraUsuarioComponent {
  registraUsuarioForm: FormGroup;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private modalsService: ModalsService
  ) {
    this.registraUsuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: [
        '',
        [Validators.required, this._validacionPasswords()],
      ],
    });
  }

  public onHacerRegistro() {
    if (this.registraUsuarioForm.invalid) {
      this.mensaje = 'Formulario inválido';
      return;
    }

    const { email, password } = this.registraUsuarioForm.value;
    console.log('Registrar usuario:', email, password);

    this.autenticacionService.registrarUsuario({ email, password }).subscribe({
      next: () => {
        this.modalsService
          .mostrarConfirmacion('Usuario registrado con éxito', 'Éxito')
          .subscribe((confirmado) => {
            if (confirmado) {
              this.router.navigate(['login']);
            }
          });
      },
      error: (err) => {
        const mensajeError =
          err?.error?.mensaje || 'Ocurrió un error al registrar el usuario';
        this.modalsService.mostrarError(mensajeError);
      },
    });
  }

  public onVolverLogin() {
    this.router.navigate(['login']);
  }

  private _validacionPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;

      const password = parent.get('password')?.value;
      const confirmarPass = control.value;

      return password === confirmarPass ? null : { passwordMismatch: true };
    };
  }
}
