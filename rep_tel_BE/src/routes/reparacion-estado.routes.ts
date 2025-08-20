import { Router } from 'express';
import { authenticate } from '../auth';
import { obtenerEstados } from '../controllers/reparacion-estado.controller';

const router = Router();
router.get('/', authenticate, obtenerEstados);
export default router;
