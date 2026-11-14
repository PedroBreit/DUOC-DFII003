
import { useCallback, useEffect, useState } from 'react';
import {
  obtenerCategorias,
  limpiarCacheCategorias,
} from '../services/categoriasService';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  const reintentar = useCallback(() => {
    limpiarCacheCategorias();
    setIntento((actual) => actual + 1);
  }, []);

  useEffect(() => {
    let activo = true;

    async function cargarCategorias() {
      setCargando(true);
      setError(null);

      try {
        const datos = await obtenerCategorias();

        if (activo) {
          setCategorias(datos);
        }
      } catch (err) {
        if (activo) {
          
        const mensaje = err.message.includes('404')
        ? 'No se encontró el servicio de categorías (404).'
        : err.message.includes('500')
            ? 'El servidor presentó un problema (500).'
            : 'Error de conexión. Comprueba el servicio e intenta nuevamente.';

        setError(mensaje);

        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarCategorias();

    return () => {
      activo = false;
    };
  }, [intento]);

  return (
    <main>
      <h1>Categorías de libros</h1>
      <p>Explora nuestra biblioteca por categoría.</p>

      {cargando && (
        <div className="estado-carga" role="status">
          <span className="spinner" aria-hidden="true"></span>
          <p>Cargando categorías desde la API REST...</p>
        </div>
      )}

      {!cargando && error && (
        <div className="mensaje-error" role="alert">
          <h2>No fue posible cargar los datos</h2>
          <p>{error}</p>
          <button onClick={reintentar}>
            Reintentar consulta
          </button>
        </div>
      )}

      {!cargando && !error && (
        <section className="categorias-grid">
          {categorias.map((categoria) => (
            <article className="categoria-card" key={categoria.id}>
              <span className="categoria-icono">
                {categoria.icono}
              </span>
              <h2>{categoria.nombre}</h2>
              <p>{categoria.descripcion}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
