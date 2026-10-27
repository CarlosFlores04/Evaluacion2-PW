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
function validarCantidad(cantidad) {
if (!Number.isInteger(cantidad) || cantidad < 1) {
throw crearError(400, 'La cantidad debe ser un número entero mayor a 0');
}
}
function validarCambio(equipo, diferencia) {
if (diferencia > equipo.stock) {
throw crearError(400, 'Stock en base insuficiente');
}
if (calcularTotal() + equipo.precio * diferencia > CREDITOS_MISION) {
throw crearError(400, 'Créditos insuficientes para esta cantidad');
}
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
function agregarEquipo(equipoId, cantidad) {
validarCantidad(cantidad);
const equipo = buscarEquipo(equipoId);
if (!equipo) {
throw crearError(404, 'El suministro no existe');
}
validarCambio(equipo, cantidad);
equipo.stock -= cantidad;
const item = buscarItem(equipoId);
if (item) {
item.cantidad += cantidad;
} else {
itemsCargados.push({ id: equipoId, cantidad });
}
return obtenerCarga();
}
reiniciarMision();
module.exports = {
obtenerInventario,
obtenerCarga,agregarEquipo,
};
