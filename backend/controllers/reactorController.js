const servicio = require('../services/reactorService');

function estado(req, res) {
  res.json(servicio.obtenerEstado());
}

function ajustar(req, res) {
  const { temperatura } = req.body || {};
  res.json(servicio.ajustar(Number(temperatura)));
}

function reiniciar(req, res) {
  servicio.reiniciarReactor();
  res.json({ mensaje: 'Reactor reiniciado. Se generó una nueva temperatura' });
}

module.exports = { estado, ajustar, reiniciar };