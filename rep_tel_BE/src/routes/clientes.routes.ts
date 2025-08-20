import { Router } from 'express';
import {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from '../controllers/clientes.controller';
import { authenticate } from '../auth';

const router = Router();
router.get('/', authenticate, obtenerClientes);
router.get('/:id', authenticate, obtenerClientePorId);
router.post('/', authenticate, crearCliente);
router.put('/:id', authenticate, actualizarCliente);
router.delete('/:id', authenticate, eliminarCliente);

export default router;
