const servicio = require('../services/misionService');
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
module.exports = {
listarInventario,
verCarga,
agregar,
};
