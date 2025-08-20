import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/env';
import { RegistraUsuario } from '../../models/Usuario';
import { TOKEN_AUTH } from '../../models/Autenticacion';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private baseUrl = `${environment.apiUrl}/autenticacion`;

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  public registrarUsuario(usuario: RegistraUsuario): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrarUsuario`, usuario);
  }

  public cerrarSesion() {
    localStorage.removeItem(TOKEN_AUTH);
  }

  public guardarToken(token: string) {
    localStorage.setItem(TOKEN_AUTH, token);
  }

  public obtenerToken(): string | null {
    return localStorage.getItem(TOKEN_AUTH);
  }

  public usuarioLogueado(): boolean {
    return !!this.obtenerToken();
  }
}
