import express from 'express';
import cors from 'cors';
import autenticacionRoutes from './routes/autenticacion.routes';
import clientesRoutes from './routes/clientes.routes';
import telefonosRoutes from './routes/telefonos.routes';
import reparacionesRoutes from './routes/reparaciones.routes';
import { env } from './config/env';
import usuariosRoutes from './routes/usuarios.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', autenticacionRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/telefonos', telefonosRoutes);
app.use('/api/reparaciones', reparacionesRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.get('/', (req, res) => res.send('Backend Reparacion celulares funcionando'));

app.listen(env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
});


export default app;
