const Reloj = require('./reloj');
const crearError = require('../utils/crearError');

const reloj = new Reloj(120);
let temperaturaIdeal = 0;
let estabilizado = false;

function reiniciarReactor() {
  temperaturaIdeal = Math.floor(Math.random() * 100) + 1;
  estabilizado = false;
  reloj.reiniciar();
  console.log(`Temperatura de estabilización: ${temperaturaIdeal}`);
}

function obtenerEstado() {
  reloj.arrancar();
  return {
    tiempoRestante: reloj.segundosRestantes(),
    expirado: reloj.haTerminado(),
    estabilizado,
  };
}

function ajustar(temperatura) {
  if (estabilizado) {
    throw crearError(400, 'El reactor ya está estabilizado. Reinicia para jugar de nuevo');
  }

  if (reloj.haTerminado()) {
    throw crearError(400, 'Se acabó el tiempo. Reinicia para jugar de nuevo');
  }

  if (!Number.isInteger(temperatura) || temperatura < 1 || temperatura > 100) {
    throw crearError(400, 'La temperatura debe ser un número entero entre 1 y 100');
  }

  if (temperatura < temperaturaIdeal) {
    return { resultado: 'más alta', mensaje: 'La temperatura ideal es más alta' };
  }

  if (temperatura > temperaturaIdeal) {
    return { resultado: 'más baja', mensaje: 'La temperatura ideal es más baja' };
  }

  estabilizado = true;
  reloj.detener();
  return { resultado: 'estabilizado', mensaje: '¡Reactor estabilizado!' };
}

reiniciarReactor();

module.exports = { obtenerEstado, ajustar, reiniciarReactor };