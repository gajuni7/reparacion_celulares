export interface Usuario {
  id: number;
  email: string;
  clave_hash: string;
  creado_en: string;
}

export interface RegistraUsuario {
  email: string;
  password: string;
}