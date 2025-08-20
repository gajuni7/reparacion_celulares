import { Request, Response } from 'express';
import connection from '../db-connection';
import { AuthRequest } from '../auth';
import { Reparacion, ReparacionDetalle } from '../models/Reparacion';

export function crearReparacionTel(req: AuthRequest, res: Response) {
  const telefonoId = Number(req.params.id);
  const { descripcion, estado, precio, reparado_en } = req.body;

  if (!descripcion) {
    return res.status(400).json({ mensaje: 'La descripción es obligatoria' });
  }

  connection.query(
    `INSERT INTO reparaciones (phone_id, descripcion, estado, costo, reparado_en)
     VALUES (?, ?, ?, ?, ?)`,
    [telefonoId, descripcion, estado ?? 'pendiente', precio ?? 0, reparado_en ?? null],
    (err, resultado) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al crear reparación', error: err });
      }

      const insertResult = resultado as any;
      res.status(201).json({ id: insertResult.insertId });
    }
  );
}

export function listarReparacionesPorTelefono(req: AuthRequest, res: Response) {
  const telefonoId = Number(req.params.id);
  const { sql, params } = _queryReparaciones(telefonoId);

  connection.query(sql, params, (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener reparaciones', error: err });
    res.json(_mapReparaciones(resultados as any[]));
  });
}

export function listarFullReparaciones(req: AuthRequest, res: Response) {
  const order = (req.query.order as string)?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  const { sql, params } = _queryReparaciones(undefined, order as 'ASC' | 'DESC');

  connection.query(sql, params, (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener reparaciones', error: err });
    res.json(_mapReparaciones(resultados as any[]));
  });
}

function _queryReparaciones(telefonoId?: number, order: 'ASC' | 'DESC' = 'DESC') {
  let sql = `
    SELECT r.id AS reparacion_id,
           r.descripcion,
           r.costo,
           r.reparado_en,
           r.creado_en,
           t.id AS telefono_id,
           t.marca,
           t.modelo,
           t.imei,
           c.id AS cliente_id,
           c.nombre,
           c.apellido,
           c.email,
           c.telefono AS cliente_telefono,
           e.nombre AS estado
    FROM reparaciones r
    JOIN telefonos t ON t.id = r.telefono_id
    JOIN clientes c ON c.id = t.cliente_id
    JOIN estados_reparacion e ON e.id = r.estado_id
  `;

  const params: any[] = [];
  if (telefonoId) {
    sql += ' WHERE r.telefono_id = ?';
    params.push(telefonoId);
  }

  sql += ` ORDER BY COALESCE(r.reparado_en, r.creado_en) ${order}`;
  return { sql, params };
}


function _mapReparaciones(resultados: any[]): ReparacionDetalle[] {
  return resultados.map((r) => ({
      id: r.reparacion_id,
      descripcion: r.descripcion,
      costo: r.costo,
      estado_id: r.estado_id,
      estado: r.estado,
      reparado_en: r.reparado_en,
      creado_en: r.creado_en,
      telefono: {
        id: r.telefono_id,
        cliente_id: r.telefono_cliente_id,
        marca: r.marca,
        modelo: r.modelo,
        imei: r.imei,
        creado_en: r.telefono_creado_en,
      },
      cliente: {
        id: r.cliente_id,
        nombre: r.nombre,
        apellido: r.apellido,
        email: r.email,
        telefono: r.cliente_telefono,
        creado_en: r.cliente_creado_en,
      },
  }));
}

