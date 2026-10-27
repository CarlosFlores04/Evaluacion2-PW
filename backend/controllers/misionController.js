const servicio = require('../services/misionService');
function listarInventario(req, res) {
res.json(servicio.obtenerInventario());
}
function verCarga(req, res) {
res.json(servicio.obtenerCarga());
}
module.exports = {
listarInventario,
verCarga,
};
