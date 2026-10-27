import { peticion } from './http';

export function obtenerEstadoReactor() {
  return peticion('/reactor/estado');
}

export function ajustarTemperatura(temperatura) {
  return peticion('/adjust', {
    method: 'POST',
    body: JSON.stringify({ temperatura }),
  });
}

export function reiniciarReactor() {
  return peticion('/reboot', { method: 'POST' });
}