import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { Router } from '@angular/router';
import { ModalsService } from '../../../shared/modals.service';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  usuarios: Usuario[] = [];
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private modalsService: ModalsService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.mensaje = 'Formulario inválido';
      return;
    }

    this.autenticacionService.login(email, password).subscribe({
      next: (res) => {
        this.autenticacionService.guardarToken(res.token);
        this.router.navigate(['inicio']);
      },
      error: (err) => {
        const mensajeError =
          err?.error?.mensaje || 'Ocurrió un error al hacer login';
        this.modalsService.mostrarError(mensajeError);
      },
    });
  }

  onCrearUsuario() {
    this.router.navigate(['registrar-usuario']);
  }
}
