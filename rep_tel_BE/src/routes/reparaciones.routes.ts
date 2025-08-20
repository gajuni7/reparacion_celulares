import { Router } from 'express';
import { listarReparaciones, crearReparacionTel, listarFullReparaciones } from '../controllers/reparaciones.controller';
import { authenticate } from '../auth';

const router = Router();

router.get('/:id', authenticate, listarReparaciones);
router.post('/:id', authenticate, crearReparacionTel);
router.get('/detalle', authenticate, listarFullReparaciones);

export default router;
