const API_URL = `${import.meta.env.BASE_URL}api/destinos`;

async function consultarAPI(url, signal) {
  const respuesta = await fetch(url, { signal });

  if (!respuesta.ok) {
    if (respuesta.status === 404) {
      throw new Error('Destino no encontrado');
    }

    throw new Error(
      `Error del servidor: HTTP ${respuesta.status}`
    );
  }

  return respuesta.json();
}

export function obtenerDestinos(signal) {
  return consultarAPI(API_URL, signal);
}

export function obtenerDestinoPorId(id, signal) {
  return consultarAPI(
    `${API_URL}/${encodeURIComponent(id)}`,
    signal
  );
}
