
const cacheLibros = new Map();
const peticionesPendientes = new Map();

async function consultarAPI(url) {
  if (cacheLibros.has(url)) {
    return cacheLibros.get(url);
  }

  if (peticionesPendientes.has(url)) {
    return peticionesPendientes.get(url);
  }

  const peticion = (async () => {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    cacheLibros.set(url, datos);
    return datos;
  })();

  peticionesPendientes.set(url, peticion);

  try {
    return await peticion;
  } finally {
    peticionesPendientes.delete(url);
  }
}

export function obtenerLibrosPorCategoria(categoriaId) {
  return consultarAPI(
    `/api/libros?categoriaId=${encodeURIComponent(categoriaId)}`
  );
}

export function obtenerLibroPorId(id) {
  return consultarAPI(
    `/api/libros/${encodeURIComponent(id)}`
  );
}
