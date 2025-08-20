import { Request, Response } from 'express';
import { AuthRequest } from '../auth';
import connection from '../db-connection';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Cliente } from '../models/Cliente';

export const obtenerClientes = (req: AuthRequest, res: Response) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener clientes', error: err });
    res.json(results);
  });
};

export const obtenerClientePorId = (req: AuthRequest, res: Response) => {
  const clienteId = req.params.id;
  connection.query('SELECT * FROM clientes WHERE id = ?', [clienteId], (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener cliente', error: err });
    const clientes = results as Cliente[];
    if (clientes.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(clientes[0]);
  });
};

// Crear un nuevo cliente
export const crearCliente = (req: AuthRequest, res: Response) => {
  const { name, email, phone } = req.body;
  connection.query(
    'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    (err, results) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al crear cliente', error: err });
      }
      const resultadoInsert = results as ResultSetHeader;
      res.status(201).json({ mensaje: 'Cliente creado', idCliente: resultadoInsert.insertId });
    }
  );
};

export const actualizarCliente = (req: AuthRequest, res: Response) => {
  const clienteId = req.params.id;
  const { name, email, phone } = req.body;

  connection.query(
    'UPDATE clientes SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, clienteId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al actualizar cliente', error: err });
      }
      res.json({ mensaje: 'Cliente actualizado' });
    }
  );
};

export const eliminarCliente = (req: AuthRequest, res: Response) => {
  const clienteId = req.params.id;

  connection.query('DELETE FROM clientes WHERE id = ?', [clienteId], (err, results) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al eliminar cliente', error: err });
    }
    res.json({ mensaje: 'Cliente eliminado' });
  });
};
