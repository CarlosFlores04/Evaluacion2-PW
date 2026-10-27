const express = require('express');
const reactorRoutes = require('./routes/reactorRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de la Evaluación II funcionando' });
});

app.use('/', reactorRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const mensaje = status === 500 ? 'Error interno del servidor' : err.message;
  res.status(status).json({ error: mensaje });
});

module.exports = app;