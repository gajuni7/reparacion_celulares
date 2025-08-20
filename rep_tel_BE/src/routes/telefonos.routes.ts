import { Router } from 'express';
import { listarTelefonosPorCliente } from '../controllers/telefonos.controller';
import { authenticate } from '../auth';

const router = Router();
router.get('/cliente/:id', authenticate, listarTelefonosPorCliente);

export default router;
