const servicio = require('../services/misionService');

const pausa = (milisegundos) => new Promise((resolve) => setTimeout(resolve, milisegundos));

function listarInventario(req, res) {
  res.json(servicio.obtenerInventario());
}

function verCarga(req, res) {
  res.json(servicio.obtenerCarga());
}

function agregar(req, res) {
  const { equipoId, cantidad } = req.body || {};
  const carga = servicio.agregarEquipo(Number(equipoId), Number(cantidad));
  res.status(201).json(carga);
}

async function actualizar(req, res) {
  await pausa(400);
  const id = Number(req.params.id);
  const { cantidad } = req.body || {};
  res.json(servicio.actualizarUnidades(id, Number(cantidad)));
}

function eliminar(req, res) {
  const id = Number(req.params.id);
  res.json(servicio.eliminarEquipo(id));
}

function confirmar(req, res) {
  res.json(servicio.confirmarCarga());
}

function reiniciar(req, res) {
  servicio.reiniciarMision();
  res.json(servicio.obtenerCarga());
}

module.exports = {
  listarInventario,
  verCarga,
  agregar,
  actualizar,
  eliminar,
  confirmar,
  reiniciar,
};