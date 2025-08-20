import express from 'express';
import cors from 'cors';
import autenticacionRoutes from './routes/autenticacion.routes';
import clientesRoutes from './routes/clientes.routes';
import telefonosRoutes from './routes/telefonos.routes';
import reparacionesRoutes from './routes/reparaciones.routes';
import { env } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', autenticacionRoutes);
app.use('/api/clients', clientesRoutes);
app.use('/api/phones', telefonosRoutes);
app.use('/api/repairs', reparacionesRoutes);

app.get('/', (req, res) => res.send('Backend Reparacion celulares funcionando'));

app.listen(env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
});


export default app;
