import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { obtenerDestinos } from '../services/destinosService';

import DestinoCard from '../components/DestinoCard';
import IconoHorizonte from '../components/IconoHorizonte';
import IconoFlecha from '../components/IconoFlecha';

import imagenPortada from '../assets/images/hero/hero-cusco.png';

import './Destinos.css';

const CLAVE_FAVORITOS = 'horizonte-viajes-favoritos';

function leerFavoritos() {
  try {
    const datos = JSON.parse(
      window.localStorage.getItem(CLAVE_FAVORITOS) || '[]'
    );

    if (!Array.isArray(datos)) {
      return [];
    }

    return datos
      .map(Number)
      .filter(Number.isFinite);
  } catch {
    return [];
  }
}

function IconoCorazon({ activo }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill={activo ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.1l8.8-8.7a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export default function Destinos() {
  const [destinos, setDestinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  const [busqueda, setBusqueda] = useState('');
  const [paisSeleccionado, setPaisSeleccionado] =
    useState('todos');
  const [orden, setOrden] = useState('nombre-asc');
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [favoritos, setFavoritos] = useState(leerFavoritos);

  useEffect(() => {
    let activo = true;

    async function cargarDestinos() {
      try {
        setCargando(true);
        setError(null);

        const datos = await obtenerDestinos();

        if (!activo) return;

        if (!Array.isArray(datos)) {
          throw new Error(
            'El servicio no entregó una lista válida de destinos.'
          );
        }

        setDestinos(datos);
      } catch (err) {
        if (!activo) return;

        setError(
          err.message ||
          'No fue posible obtener los destinos.'
        );
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarDestinos();

    return () => {
      activo = false;
    };
  }, [intento]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        CLAVE_FAVORITOS,
        JSON.stringify(favoritos)
      );
    } catch {
      // La página sigue funcionando si localStorage
      // no está disponible.
    }
  }, [favoritos]);

  const paises = useMemo(() => {
    return [...new Set(
      destinos.map((destino) => destino.pais)
    )].sort((a, b) =>
      a.localeCompare(b, 'es', {
        sensitivity: 'base',
      })
    );
  }, [destinos]);

  const destinosFiltrados = useMemo(() => {
    const texto = busqueda
      .trim()
      .toLocaleLowerCase('es');

    const resultados = destinos.filter((destino) => {
      const contenido = [
        destino.nombre,
        destino.pais,
        destino.actividad,
        destino.descripcion,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('es');

      const coincideBusqueda =
        contenido.includes(texto);

      const coincidePais =
        paisSeleccionado === 'todos' ||
        destino.pais === paisSeleccionado;

      const coincideFavorito =
        !soloFavoritos ||
        favoritos.includes(Number(destino.id));

      return (
        coincideBusqueda &&
        coincidePais &&
        coincideFavorito
      );
    });

    return [...resultados].sort((a, b) => {
      const comparacion = a.nombre.localeCompare(
        b.nombre,
        'es',
        { sensitivity: 'base' }
      );

      return orden === 'nombre-desc'
        ? -comparacion
        : comparacion;
    });
  }, [
    destinos,
    busqueda,
    paisSeleccionado,
    orden,
    soloFavoritos,
    favoritos,
  ]);

  function alternarFavorito(id) {
    const numeroId = Number(id);

    setFavoritos((actuales) => {
      if (actuales.includes(numeroId)) {
        return actuales.filter(
          (valor) => valor !== numeroId
        );
      }

      return [...actuales, numeroId];
    });
  }

  function limpiarFiltros() {
    setBusqueda('');
    setPaisSeleccionado('todos');
    setOrden('nombre-asc');
    setSoloFavoritos(false);
  }

  const hayFiltros =
    busqueda.trim() !== '' ||
    paisSeleccionado !== 'todos' ||
    orden !== 'nombre-asc' ||
    soloFavoritos;

  return (
    <main className="pagina-destinos">
      <nav
        className="destinos-breadcrumb"
        aria-label="Ruta de navegación"
      >
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Destinos</span>
      </nav>

      <header className="destinos-hero">
        <img
          src={imagenPortada}
          alt=""
          aria-hidden="true"
          className="destinos-hero-imagen"
        />

        <div className="destinos-hero-overlay" />

        <div className="destinos-hero-contenido">
          <span className="destinos-hero-etiqueta">
            HORIZONTE VIAJES
          </span>

          <h1>Destinos para descubrir.</h1>

          <p>
            Lugares que inspiran nuevas aventuras.
          </p>
        </div>
      </header>

      <section
        className="destinos-explorador"
        aria-label="Buscar y filtrar destinos"
      >
        <div className="destinos-filtros">
          <div className="destinos-campo destinos-campo-busqueda">
            <label htmlFor="buscar-destino">
              Buscar destino
            </label>

            <div className="destinos-input-contenedor">
              <IconoHorizonte
                nombre="busqueda"
                tamaño={26}
              />

              <input
                id="buscar-destino"
                type="search"
                placeholder="Ciudad, país o actividad..."
                value={busqueda}
                onChange={(evento) =>
                  setBusqueda(evento.target.value)
                }
              />
            </div>
          </div>

          <div className="destinos-campo">
            <label htmlFor="filtrar-pais">
              País
            </label>

            <select
              id="filtrar-pais"
              value={paisSeleccionado}
              onChange={(evento) =>
                setPaisSeleccionado(evento.target.value)
              }
            >
              <option value="todos">
                Todos los países
              </option>

              {paises.map((pais) => (
                <option key={pais} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
          </div>

          <div className="destinos-campo">
            <label htmlFor="ordenar-destinos">
              Ordenar por
            </label>

            <select
              id="ordenar-destinos"
              value={orden}
              onChange={(evento) =>
                setOrden(evento.target.value)
              }
            >
              <option value="nombre-asc">
                Nombre A–Z
              </option>

              <option value="nombre-desc">
                Nombre Z–A
              </option>
            </select>
          </div>

          <button
            type="button"
            className="limpiar-filtros"
            onClick={limpiarFiltros}
            disabled={!hayFiltros}
          >
            Limpiar
          </button>
        </div>

        <div className="destinos-herramientas">
          <div
            className="destinos-contador"
            aria-live="polite"
            aria-atomic="true"
          >
            {!cargando && !error && (
              <p>
                <strong>
                  {destinosFiltrados.length}
                </strong>{' '}
                {destinosFiltrados.length === 1
                  ? 'destino encontrado'
                  : 'destinos encontrados'}
              </p>
            )}
          </div>

          <button
            type="button"
            className={
              soloFavoritos
                ? 'destinos-solo-favoritos activo'
                : 'destinos-solo-favoritos'
            }
            onClick={() =>
              setSoloFavoritos((valor) => !valor)
            }
            aria-pressed={soloFavoritos}
          >
            <IconoCorazon activo={soloFavoritos} />

            <span>Mis favoritos</span>

            <span className="destinos-favoritos-numero">
              {favoritos.length}
            </span>
          </button>
        </div>
      </section>

      {cargando && (
        <div
          className="destinos-mensaje"
          role="status"
        >
          <span
            className="destinos-cargando"
            aria-hidden="true"
          />

          <h2>Buscando nuevos horizontes...</h2>

          <p>Cargando destinos disponibles.</p>
        </div>
      )}

      {!cargando && error && (
        <div
          className="destinos-mensaje"
          role="alert"
        >
          <h2>No pudimos cargar los destinos.</h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() =>
              setIntento((valor) => valor + 1)
            }
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && (
        destinosFiltrados.length > 0 ? (
          <section
            className="destinos-grid"
            aria-label="Catálogo de destinos"
          >
            {destinosFiltrados.map((destino) => (
              <DestinoCard
                key={destino.id}
                destino={destino}
                esFavorito={favoritos.includes(
                  Number(destino.id)
                )}
                onToggleFavorito={alternarFavorito}
              />
            ))}
          </section>
        ) : (
          <div className="destinos-mensaje">
            <IconoHorizonte
              nombre="busqueda"
              tamaño={48}
            />

            <h2>No encontramos coincidencias.</h2>

            <p>
              Prueba con otra búsqueda o ajusta los
              filtros para descubrir más destinos.
            </p>

            <button
              type="button"
              onClick={limpiarFiltros}
            >
              Ver todos los destinos
            </button>
          </div>
        )
      )}

      <section className="destinos-cierre">
        <div>
          <span>HORIZONTE VIAJES</span>

          <h2>El mundo está más cerca.</h2>

          <p>
            Elige un destino y descubre vuelos,
            alojamientos y experiencias.
          </p>
        </div>

        <Link
          to="/"
          className="destinos-cierre-enlace"
        >
          Volver al inicio

          <IconoFlecha
            direccion="arriba"
            tamaño={18}
          />
        </Link>
      </section>
    </main>
  );
}
