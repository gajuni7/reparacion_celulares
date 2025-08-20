import { Injectable } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { environment } from '../../../enviroments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../autenticacion/services/autenticacion.service';
import { Telefono } from '../../models/Telefono';
import { ReparacionDetalle } from '../../models/Reparacion';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _apiClientes = `${environment.apiUrl}/clientes`;
  private _apiTelefonos = `${environment.apiUrl}/telefonos`;
  private _apiReparaciones = `${environment.apiUrl}/reparaciones`;

  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) {}

  public obtenerClientes(): Observable<Cliente[]> {
    const headers = this._getAuthHeaders();
    return this.http.get<Cliente[]>(this._apiClientes, { headers });
  }

  public obtenerClientePorId(id: number): Observable<Cliente> {
    const headers = this._getAuthHeaders();
    return this.http.get<Cliente>(`${this._apiClientes}/${id}`, { headers });
  }

  public obtenerTelefonosPorCliente(clienteId: number): Observable<Telefono[]> {
    const headers = this._getAuthHeaders();
    return this.http.get<Telefono[]>(
      `${this._apiTelefonos}/cliente/${clienteId}`,
      { headers }
    );
  }
  public listarReparacionesPorTelefono(telefonoId: number): Observable<ReparacionDetalle[]> {
    const headers = this._getAuthHeaders();
    return this.http.get<ReparacionDetalle[]>(
      `${this._apiReparaciones}/telefono/${telefonoId}`,
      { headers }
    );
  }

  private _getAuthHeaders(): HttpHeaders {
    const token = this.autenticacionService.obtenerToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
}
