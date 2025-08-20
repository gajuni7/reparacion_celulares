import { Router } from 'express';
import {
  agregarTelefonoACliente,
  listarTelefonosPorCliente,
  obtenerTelefonoPorId,
} from '../controllers/telefonos.controller';
import { authenticate } from '../auth';

const router = Router();
router.get('/:id', authenticate, obtenerTelefonoPorId);
router.get('/cliente/:id', authenticate, listarTelefonosPorCliente);
router.post('/agregar-tel-cliente/:id', authenticate, agregarTelefonoACliente);

export default router;
