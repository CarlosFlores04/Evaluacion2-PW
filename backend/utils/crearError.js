function crearError(status, mensaje) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

module.exports = crearError;