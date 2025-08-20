import { Cliente } from './Cliente';
import { Telefono } from './Telefono';

export interface Reparacion {
  id: number;
  telefono_id: number;
  descripcion: string;
  estado_id: number;
  estado?: string;
  costo: number;
  reparado_en?: string;
  creado_en: string;
}

export interface ReparacionDetalle extends Partial<Reparacion> {
  telefono: Telefono;
  cliente: Cliente;
}
