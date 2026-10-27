export async function peticion(url, opciones = {}) {
  const respuesta = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.error || 'Error en la petición');
  }

  return datos;
}