
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obtenerLibrosPorCategoria } from '../services/librosService';
import LibroCard from '../components/LibroCard';

export default function LibrosCategoria() {
  const { id } = useParams();

  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    async function cargarLibros() {
      setCargando(true);
      setError(null);

      try {
        const datos = await obtenerLibrosPorCategoria(id);

        if (activo) {
          setLibros(datos);
        }
      } catch (err) {
        if (activo) {
          const mensaje = err.message.includes('404')
            ? 'La categoría solicitada no existe.'
            : 'No fue posible cargar los libros. Intenta nuevamente.';

          setError(mensaje);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarLibros();

    return () => {
      activo = false;
    };
  }, [id, intento]);

  return (
    <main>
      <Link className="enlace-volver" to="/categorias">
        Volver a categorías
      </Link>

      <h1>Explorar libros</h1>
      <p>Descubre los títulos disponibles en esta categoría.</p>

      {cargando && (
        <div className="estado-carga" role="status">
          <span className="spinner" aria-hidden="true"></span>
          <p>Cargando libros desde la API REST...</p>
        </div>
      )}

      {!cargando && error && (
        <div className="mensaje-error" role="alert">
          <h2>No fue posible cargar los libros</h2>
          <p>{error}</p>
          <button onClick={() => setIntento((actual) => actual + 1)}>
            Reintentar consulta
          </button>
        </div>
      )}

      {!cargando && !error && libros.length === 0 && (
        <p>No hay libros disponibles en esta categoría.</p>
      )}

      {!cargando && !error && libros.length > 0 && (
        <section className="libros-grid">
          {libros.map((libro) => (
            <LibroCard key={libro.id} libro={libro} />
          ))}
        </section>
      )}
    </main>
  );
}
