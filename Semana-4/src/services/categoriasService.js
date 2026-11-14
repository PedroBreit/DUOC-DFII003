
let categoriasCache = null;
let peticionActual = null;

export async function obtenerCategorias() {
  // Reutilizar datos ya consultados
  if (categoriasCache !== null) {
    return categoriasCache;
  }

  // Evitar solicitudes simultáneas duplicadas
  if (peticionActual) {
    return peticionActual;
  }

  peticionActual = (async () => {
    const errorSimulado = sessionStorage.getItem('simularErrorAPI');

    const url = errorSimulado
    ? `/api/categorias?error=${errorSimulado}`
    : '/api/categorias';

    const respuesta = await fetch(url);

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
