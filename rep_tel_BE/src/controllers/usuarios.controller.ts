import { Response } from 'express';
import { AuthRequest } from '../auth';
import connection from '../db-connection';
import { Usuario } from '../models/Usuario';

export const listarUsuarios = (req: AuthRequest, res: Response) => {
  connection.query('SELECT * FROM usuarios', (err, resultados) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err });
    }
    const usuarios = resultados as Usuario[];
    res.json(usuarios);
  });
};
