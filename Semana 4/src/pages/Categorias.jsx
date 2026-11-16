
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  obtenerCategorias,
  limpiarCacheCategorias,
} from '../services/categoriasService';

import ficcion from '../assets/images/categorias/ficcion.png';
import cienciaFiccion from '../assets/images/categorias/ciencia-ficcion.png';
import historia from '../assets/images/categorias/historia.png';
import tecnologia from '../assets/images/categorias/tecnologia.png';
import misterio from '../assets/images/categorias/misterio.png';
import fantasia from '../assets/images/categorias/fantasia.png';

import arrowRight from '../assets/icons/arrow-right.svg';

// Relacionar cada categoría con su imagen local
const imagenesCategorias = {
  1: ficcion,
  2: cienciaFiccion,
  3: historia,
  4: tecnologia,
  5: misterio,
  6: fantasia,
};

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

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
              : 'Error de conexión. Intenta nuevamente.';

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

  function reintentar() {
    limpiarCacheCategorias();
    setIntento((actual) => actual + 1);
  }

  return (
    <main className="pagina-categorias">
      <div className="encabezado-categorias">
        <p className="etiqueta-seccion">
          NUESTRO CATÁLOGO
        </p>

        <h1>Explora nuestras categorías</h1>

        <p>
          Descubre nuevas historias, conocimientos y autores.
          Selecciona una categoría para explorar sus libros.
        </p>
      </div>

      {cargando && (
        <div className="estado-carga" role="status">
          <span className="spinner" aria-hidden="true"></span>
          <p>Cargando categorías...</p>
        </div>
      )}

      {!cargando && error && (
        <div className="mensaje-error" role="alert">
          <h2>No fue posible cargar las categorías</h2>
          <p>{error}</p>

          <button onClick={reintentar}>
            Reintentar consulta
          </button>
        </div>
      )}

      {!cargando && !error && (
        <section
          className="categorias-grid"
          aria-label="Categorías disponibles"
        >
          {categorias.map((categoria) => (
            <article
              className="categoria-card"
              key={categoria.id}
            >
              <div className="categoria-imagen">
                <img
                  src={imagenesCategorias[categoria.id]}
                  alt={`Ilustración de ${categoria.nombre}`}
                  loading="lazy"
                />
              </div>

              <div className="categoria-contenido">
                <span className="categoria-numero">
                  COLECCIÓN {String(categoria.id).padStart(2, '0')}
                </span>

                <h2>{categoria.nombre}</h2>

                <p>{categoria.descripcion}</p>

                <Link
                  className="categoria-enlace"
                  to={`/categorias/${categoria.id}`}
                >
                  Explorar libros
                  <img
                    src={arrowRight}
                    alt=""
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
