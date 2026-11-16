
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { obtenerLibroPorId } from '../services/librosService';

// Importar las imágenes locales
const portadas = import.meta.glob(
  '../assets/images/libros/*.webp',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

export default function DetalleLibro() {
  const { id } = useParams();

  const [libro, setLibro] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    async function cargarLibro() {
      setCargando(true);
      setError(null);
      setLibro(null);

      try {
        const datos = await obtenerLibroPorId(id);

        if (activo) {
          setLibro(datos);
        }
      } catch (err) {
        if (activo) {
          const mensaje = err.message.includes('404')
            ? 'El libro solicitado no existe (404).'
            : err.message.includes('500')
              ? 'El servidor presentó un problema (500).'
              : 'No fue posible consultar el libro. Intenta nuevamente.';

          setError(mensaje);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarLibro();

    return () => {
      activo = false;
    };
  }, [id, intento]);

  if (cargando) {
    return (
      <main>
        <div className="estado-carga" role="status">
          <span className="spinner" aria-hidden="true"></span>
          <p>Cargando información del libro...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="mensaje-error" role="alert">
          <h1>No fue posible cargar el libro</h1>
          <p>{error}</p>

          <button
            onClick={() => setIntento((actual) => actual + 1)}
          >
            Reintentar consulta
          </button>
        </div>

        <Link className="enlace-volver" to="/categorias">
          Volver a categorías
        </Link>
      </main>
    );
  }

  if (!libro) {
    return (
      <main>
        <p>No se encontró información del libro.</p>
      </main>
    );
  }

  const rutaImagen = `../assets/images/libros/${libro.imagen}`;
  const portada = portadas[rutaImagen];

  return (
    <main>
      <Link
        className="enlace-volver"
        to={`/categorias/${libro.categoriaId}`}
      >
        Volver a la categoría
      </Link>

      <section className="detalle-libro">
        <div className="detalle-portada">
          {portada ? (
            <img
              src={portada}
              alt={`Ilustración de ${libro.titulo}`}
            />
          ) : (
            <div className="portada-alternativa">
              <span>{libro.titulo}</span>
            </div>
          )}
        </div>

        <div className="detalle-informacion">
          <p className="etiqueta-seccion">
            NUESTRA COLECCIÓN
          </p>

          <h1>{libro.titulo}</h1>

          <p className="detalle-autor">
            Por {libro.autor}
          </p>

          <p>
            <strong>Año de publicación:</strong> {libro.anio}
          </p>

          <h2>Sinopsis</h2>

          <p>{libro.descripcion}</p>

          <Link className="boton" to="/categorias">
            Explorar otras categorías
          </Link>
        </div>
      </section>
    </main>
  );
}
