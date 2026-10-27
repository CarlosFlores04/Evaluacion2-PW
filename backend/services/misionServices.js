const inventarioInicial = require('../data/inventario');
const Reloj = require('./reloj');
const crearError = require('../utils/crearError');

const CREDITOS_MISION = 500;
const reloj = new Reloj(300);

let inventario = [];
let itemsCargados = [];
let confirmada = false;

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

function verificarMision() {
  if (confirmada) {
    throw crearError(400, 'La carga ya fue confirmada y no se puede modificar');
  }
  if (reloj.haTerminado()) {
    throw crearError(400, 'Se acabó el tiempo de la misión. Reinicia para empezar de nuevo');
  }
}

function reiniciarMision() {
  inventario = inventarioInicial.map((equipo) => ({ ...equipo }));
  itemsCargados = [];
  confirmada = false;
  reloj.reiniciar();
}

function obtenerInventario() {
  return inventario;
}

function obtenerCarga() {
  reloj.arrancar();
  const total = calcularTotal();
  return {
    creditos: CREDITOS_MISION,
    itemsCargados,
    total,
    disponibles: CREDITOS_MISION - total,
    confirmada,
    expirada: reloj.haTerminado(),
    tiempoRestante: reloj.segundosRestantes(),
  };
}

function agregarEquipo(equipoId, cantidad) {
  verificarMision();
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

function actualizarUnidades(id, nuevaCantidad) {
  verificarMision();
  const item = buscarItem(id);
  if (!item) {
    throw crearError(404, 'Ese suministro no está en la carga');
  }
  validarCantidad(nuevaCantidad);
  const equipo = buscarEquipo(id);
  const diferencia = nuevaCantidad - item.cantidad;
  validarCambio(equipo, diferencia);
  equipo.stock -= diferencia;
  item.cantidad = nuevaCantidad;
  return obtenerCarga();
}

function eliminarEquipo(id) {
  verificarMision();
  const indice = itemsCargados.findIndex((item) => item.id === id);
  if (indice === -1) {
    throw crearError(404, 'Ese suministro no está en la carga');
  }
  const equipo = buscarEquipo(id);
  equipo.stock += itemsCargados[indice].cantidad;
  itemsCargados.splice(indice, 1);
  return obtenerCarga();
}

function confirmarCarga() {
  verificarMision();
  if (itemsCargados.length === 0) {
    throw crearError(400, 'La carga está vacía. Agrega suministros antes de confirmar');
  }
  confirmada = true;
  reloj.detener();
  return obtenerCarga();
}

reiniciarMision();

module.exports = {
  obtenerInventario,
  obtenerCarga,
  agregarEquipo,
  actualizarUnidades,
  eliminarEquipo,
  confirmarCarga,
  reiniciarMision,
};