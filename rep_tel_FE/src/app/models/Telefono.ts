export interface Telefono {
  id: number;
  cliente_id: number;
  marca: string;
  modelo: string;
  imei?: string;
  creado_en: string;
}