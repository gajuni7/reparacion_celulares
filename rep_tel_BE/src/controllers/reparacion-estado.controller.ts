import { Response } from 'express';
import { AuthRequest } from '../auth';
import connection from '../db-connection';

export const obtenerEstados = (req: AuthRequest, res: Response) => {
  connection.query('SELECT * FROM estados_reparacion', (err, results) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener los estados de reparacion', error: err });
    }
    res.json(results);
  });
};
