import { peticion } from './http';

export function obtenerInventario() {
  return peticion('/api/inventario');
}

export function obtenerCarga() {
  return peticion('/api/carga');
}

export function agregarEquipo(equipoId, cantidad) {
  return peticion('/api/carga/agregar', {
    method: 'POST',
    body: JSON.stringify({ equipoId, cantidad }),
  });
}

export function actualizarUnidades(id, cantidad) {
  return peticion(`/api/carga/actualizar-unidades/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ cantidad }),
  });
}

export function eliminarEquipo(id) {
  return peticion(`/api/carga/eliminar/${id}`, { method: 'DELETE' });
}

export function confirmarCarga() {
  return peticion('/api/carga/confirmar', { method: 'POST' });
}

export function reiniciarMision() {
  return peticion('/api/mision/reiniciar', { method: 'POST' });
}