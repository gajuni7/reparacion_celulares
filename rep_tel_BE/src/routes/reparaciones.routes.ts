import { Router } from 'express';
import { listarReparacionesPorTelefono, crearReparacionTel, listarFullReparaciones } from '../controllers/reparaciones.controller';
import { authenticate } from '../auth';

const router = Router();

router.get('/telefono/:id', authenticate, listarReparacionesPorTelefono);
router.post('/telefono/:id', authenticate, crearReparacionTel);
router.get('/detalle', authenticate, listarFullReparaciones);

export default router;
