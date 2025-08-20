import { Router } from 'express';
import { iniciarSesion, registrarUsuario } from '../controllers/autenticacion.controller';

const router = Router();

router.post('/registrarUsuario', registrarUsuario);
router.post('/login', iniciarSesion);

export default router;
