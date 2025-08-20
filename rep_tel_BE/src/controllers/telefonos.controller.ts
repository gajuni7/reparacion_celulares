import { Request, Response } from 'express';
import connection from '../db-connection';
import { AuthRequest } from '../auth';
import { Telefono } from '../models/Telefono';

export const agregarTelefonoACliente = (req: Request, res: Response) => {
  const clienteId = Number(req.params.id);
  const { marca, modelo, imei } = req.body;

  if (!marca || !modelo) {
    return res.status(400).json({ mensaje: 'Marca y modelo son requeridos' });
  }

  const sql = `
    INSERT INTO telefonos (cliente_id, marca, modelo, imei)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(sql, [clienteId, marca, modelo, imei], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ mensaje: 'El IMEI ya está registrado' });
      }
      return res.status(500).json({ mensaje: 'Error al crear teléfono', error: err });
    }

    const telefonoInsert = results as any;
    res.status(201).json({ mensaje: 'Teléfono creado', idTelefono: telefonoInsert.insertId });
  });
};

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
      return res.status(200).json({ mensaje: 'No se encontraron teléfonos para este cliente' });
    }

    res.json(telefonos);
  });
}

export function obtenerTelefonoPorId(req: AuthRequest, res: Response) {
  const telefonoId = Number(req.params.id);

  if (isNaN(telefonoId)) {
    return res.status(400).json({ mensaje: 'ID de teléfono inválido' });
  }

  const sql = `
    SELECT t.id AS telefono_id,
           t.cliente_id,
           t.marca,
           t.modelo,
           t.imei,
           t.creado_en
    FROM telefonos t
    WHERE t.id = ?
  `;

  connection.query(sql, [telefonoId], (err, resultados) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener el teléfono', error: err });
    }

    const telefonos = resultados as Telefono[];

    if (!telefonos) {
      return res.status(404).json({ mensaje: 'Teléfono no encontrado' });
    }

    if (telefonos.length === 0) return res.status(404).json({ mensaje: 'Teléfono no encontrado' });
    res.json(telefonos[0]);
  });
}

