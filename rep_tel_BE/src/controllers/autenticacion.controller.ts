import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import connection from '../db-connection';
import { Usuario } from '../models/Usuario';

export const registrarUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: 'El correo y la contraseña son obligatorios' });
  }

  try {
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'El correo y la contraseña son obligatorios' });
    }

    connection.query('SELECT id FROM usuarios WHERE email = ?', [email], async (err, resultados: any) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error en la consulta', error: err });
      }

      if (resultados.length > 0) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado' });
      }

      // Encriptar la contraseña antes de guardarla
      const claveEncriptada = await bcrypt.hash(password, 10);

      connection.query('INSERT INTO usuarios (email, clave_hash) VALUES (?, ?)', [email, claveEncriptada], (err) => {
        if (err) {
          return res.status(500).json({ mensaje: 'Error al registrar usuario', error: err });
        }

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
      });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error inesperado', error });
  }
};

export const iniciarSesion = (req: Request, res: Response) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, resultados) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error en la consulta', error: err });
    }
    const usuarios = resultados as Usuario[];
    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const [usuario] = usuarios;

    // Verificar si la contraseña coincide
    const esValida = await bcrypt.compare(password, usuario.clave_hash);
    if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    // Generar un token JWT válido por 2 horas
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, env.JWT_SECRET, { expiresIn: '30m' });

    res.json({ token });
  });
};

export const cerrarSesion = (req: Request, res: Response) => {
  res.json({ mensaje: 'Cierre de sesión exitoso. Por favor elimina el token en el cliente.' });
};
