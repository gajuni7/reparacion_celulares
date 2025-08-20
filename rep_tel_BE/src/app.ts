import express from 'express';
import cors from 'cors';
import autenticacionRoutes from './routes/autenticacion.routes';
import clientesRoutes from './routes/clientes.routes';
import telefonosRoutes from './routes/telefonos.routes';
import reparacionesRoutes from './routes/reparaciones.routes';
import reparacionEstadoRoutes from './routes/reparacion-estado.routes';
import { env } from './config/env';
import usuariosRoutes from './routes/usuarios.routes';
import { verificarToken } from './middlewares/auth';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/autenticacion', autenticacionRoutes);
app.use('/api/clientes', verificarToken, clientesRoutes);
app.use('/api/telefonos', verificarToken, telefonosRoutes);
app.use('/api/reparaciones', verificarToken, reparacionesRoutes);
app.use('/api/reparacion-estado', verificarToken, reparacionEstadoRoutes);
app.use('/api/usuarios', verificarToken, usuariosRoutes);


// ---------------------------
// Servir frontend Angular
// ---------------------------
app.use(express.static(path.join(__dirname, '../rep_tel_FE/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../rep_tel_FE/dist/index.html'));
});


app.get('/', (req, res) => res.send('Backend Reparacion celulares funcionando'));

app.listen(env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
});

export default app;
