const inventarioInicial = require('../data/inventario');
const crearError = require('../utils/crearError');
const CREDITOS_MISION = 500;
let inventario = [];
let itemsCargados = [];
function buscarEquipo(id) {
return inventario.find((equipo) => equipo.id === id);
}
function buscarItem(id) {
return itemsCargados.find((item) => item.id === id);
}
function calcularTotal() {
return itemsCargados.reduce((suma, item) => {
const equipo = buscarEquipo(item.id);
return suma + equipo.precio * item.cantidad;
}, 0);
}
function reiniciarMision() {
inventario = inventarioInicial.map((equipo) => ({ ...equipo }));
itemsCargados = [];
}
function obtenerInventario() {
return inventario;
}
function obtenerCarga() {
const total = calcularTotal();
return {
creditos: CREDITOS_MISION,
itemsCargados,
total,
disponibles: CREDITOS_MISION - total,
};
}
reiniciarMision();
module.exports = {
obtenerInventario, obtenerCarga,
};
