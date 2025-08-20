import { Request, Response } from 'express';
import connection from '../db-connection';
import { AuthRequest } from '../auth';
import { Telefono } from '../models/Telefono';

export function listarTelefonosPorCliente(req: AuthRequest, res: Response) {
  const clienteId = Number(req.params.id);

  const sql = `
    SELECT t.id AS telefono_id,
           t.marca,
           t.modelo,
           t.imei,
           t.creado_en
    FROM telefonos t
    WHERE t.cliente_id = ?
    ORDER BY t.creado_en DESC
  `;

  connection.query(sql, [clienteId], (err, resultados) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener teléfonos', error: err });
    }

    const telefonos = resultados as Telefono[];
    if (telefonos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron teléfonos para este cliente' });
    }

    res.json(telefonos);
  });
}
