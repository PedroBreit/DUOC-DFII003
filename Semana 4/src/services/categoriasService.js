
let categoriasCache = null;
let peticionActual = null;

export async function obtenerCategorias() {
  if (categoriasCache !== null) {
    return categoriasCache;
  }

  if (peticionActual) {
    return peticionActual;
  }

  peticionActual = (async () => {
    const errorSimulado = sessionStorage.getItem('simularErrorAPI');

    const url = `${import.meta.env.BASE_URL}api/categorias`;

    const urlConsulta = errorSimulado
      ? `${url}?error=${encodeURIComponent(errorSimulado)}`
      : url;

    const respuesta = await fetch(urlConsulta);

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos)) {
      throw new Error('Formato de datos incorrecto');
    }

    categoriasCache = datos;
    return datos;
  })();

  try {
    return await peticionActual;
  } finally {
    peticionActual = null;
  }
}

export function limpiarCacheCategorias() {
  categoriasCache = null;
}
