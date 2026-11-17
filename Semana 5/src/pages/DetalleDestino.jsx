import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { obtenerDestinoPorId } from '../services/destinosService';

import ViajesDestino from '../components/ViajesDestino';
import IconoHorizonte from '../components/IconoHorizonte';
import IconoFlecha from '../components/IconoFlecha';

import atacama from '../assets/images/destinos/destino-atacama.png';
import cusco from '../assets/images/destinos/destino-cusco.png';
import rio from '../assets/images/destinos/destino-rio.png';
import buenosAires from '../assets/images/destinos/destino-buenos-aires.png';
import cartagena from '../assets/images/destinos/destino-cartagena.png';
import cancun from '../assets/images/destinos/destino-cancun.png';

import astronomia from '../assets/images/actividades/actividad-astronomia-atacama.png';
import valleLuna from '../assets/images/actividades/actividad-valle-luna.png';
import lagunas from '../assets/images/actividades/actividad-lagunas-altiplanicas.png';

import machuPicchu from '../assets/images/actividades/actividad-machu-picchu.png';
import valleSagrado from '../assets/images/actividades/actividad-valle-sagrado.png';
import culturaCusco from '../assets/images/actividades/actividad-cultura-cusco.png';

import cristoRedentor from '../assets/images/actividades/actividad-cristo-redentor.png';
import copacabana from '../assets/images/actividades/actividad-copacabana.png';
import panAzucar from '../assets/images/actividades/actividad-pan-azucar.png';

import caminito from '../assets/images/actividades/actividad-caminito.png';
import teatroColon from '../assets/images/actividades/actividad-teatro-colon.png';
import tango from '../assets/images/actividades/actividad-tango.png';

import ciudadAmurallada from '../assets/images/actividades/actividad-ciudad-amurallada.png';
import islasRosario from '../assets/images/actividades/actividad-islas-rosario.png';
import castilloSanFelipe from '../assets/images/actividades/actividad-castillo-san-felipe.png';

import chichenItza from '../assets/images/actividades/actividad-chichen-itza.png';
import islaMujeres from '../assets/images/actividades/actividad-isla-mujeres.png';
import cenotes from '../assets/images/actividades/actividad-cenotes.png';

import './DetalleDestino.css';

/* =========================================
   RECURSOS GRAFICOS POR DESTINO
   ========================================= */

const recursosDestinos = {
  1: {
    portada: atacama,
    experiencias: [
      astronomia,
      valleLuna,
      lagunas,
    ],
  },

  2: {
    portada: cusco,
    experiencias: [
      machuPicchu,
      valleSagrado,
      culturaCusco,
    ],
  },

  3: {
    portada: rio,
    experiencias: [
      cristoRedentor,
      copacabana,
      panAzucar,
    ],
  },

  4: {
    portada: buenosAires,
    experiencias: [
      caminito,
      teatroColon,
      tango,
    ],
  },

  5: {
    portada: cartagena,
    experiencias: [
      ciudadAmurallada,
      islasRosario,
      castilloSanFelipe,
    ],
  },

  6: {
    portada: cancun,
    experiencias: [
      chichenItza,
      islaMujeres,
      cenotes,
    ],
  },
};

/* =========================================
   DESCRIPCIONES DE EXPERIENCIAS
   ========================================= */

const descripcionesExperiencias = {
  1: [
    'Contempla uno de los cielos más impresionantes del mundo y descubre las maravillas del universo.',
    'Explora formaciones rocosas, dunas y paisajes que parecen pertenecer a otro planeta.',
    'Descubre lagunas de aguas intensas rodeadas de volcanes y montañas del altiplano.',
  ],

  2: [
    'Recorre uno de los sitios arqueológicos más extraordinarios de la civilización inca.',
    'Descubre pueblos, terrazas y paisajes que conservan siglos de historia andina.',
    'Conoce la arquitectura, las tradiciones y el patrimonio cultural de Cusco.',
  ],

  3: [
    'Disfruta de una vista panorámica de Río de Janeiro desde uno de sus monumentos más emblemáticos.',
    'Recorre una de las playas más reconocidas y vive la energía de la costa carioca.',
    'Admira las vistas de la bahía y los paisajes naturales que rodean la ciudad.',
  ],

  4: [
    'Camina por las calles coloridas de La Boca y descubre su arte y cultura.',
    'Conoce la arquitectura y el patrimonio de uno de los teatros más famosos de Argentina.',
    'Vive la música, la danza y la tradición del tango argentino.',
  ],

  5: [
    'Recorre las calles históricas y la arquitectura colonial del corazón de Cartagena.',
    'Descubre playas, paisajes tropicales y aguas cristalinas en el Caribe colombiano.',
    'Explora una fortaleza histórica que forma parte del patrimonio de la ciudad.',
  ],

  6: [
    'Descubre los vestigios de la civilización maya y uno de sus sitios arqueológicos más reconocidos.',
    'Disfruta de playas paradisíacas y aguas turquesas del Caribe mexicano.',
    'Explora piscinas naturales de agua dulce en un entorno único.',
  ],
};

/* =========================================
   ICONOS DE EXPERIENCIAS
   ========================================= */

const iconosExperiencias = [
  'experiencia',
  'aventura',
  'ruta',
];

function obtenerNombreActividad(actividad) {
  if (typeof actividad === 'string') {
    return actividad;
  }

  if (
    actividad &&
    typeof actividad === 'object'
  ) {
    return (
      actividad.nombre ||
      actividad.titulo ||
      actividad.descripcion ||
      'Experiencia por descubrir'
    );
  }

  return 'Experiencia por descubrir';
}

/* =========================================
   GALERIA DE EXPERIENCIAS
   ========================================= */

function GaleriaActividades({ destino }) {
  const recursos = recursosDestinos[Number(destino.id)];

  const actividades = Array.isArray(destino.actividades)
    ? destino.actividades
    : [];

  return (
    <section
      id="actividades"
      className="detalle-experiencias"
      aria-labelledby="titulo-actividades"
    >
      <div className="detalle-seccion-encabezado">
        <div>
          <span className="detalle-eyebrow">
            EXPERIENCIAS EN DESTINO
          </span>

          <h2 id="titulo-actividades">
            Descubre qué hacer.
          </h2>

          <p>
            Vive experiencias únicas y descubre
            lo mejor de cada lugar.
          </p>
        </div>
      </div>

      {actividades.length > 0 ? (
        <div className="detalle-experiencias-grid">
          {actividades.map((actividad, indice) => {
            const nombre =
              obtenerNombreActividad(actividad);

            const imagen =
              recursos?.experiencias[indice];

            const descripcion =
              descripcionesExperiencias[
                Number(destino.id)
              ]?.[indice] ||
              'Descubre una experiencia especial durante tu viaje.';

            const nombreIcono =
              iconosExperiencias[
                indice % iconosExperiencias.length
              ];

            return (
              <article
                key={`${destino.id}-${indice}`}
                className="detalle-experiencia-card"
              >
                <div className="detalle-experiencia-imagen">
                  {imagen && (
                    <img
                      src={imagen}
                      alt={`Imagen ilustrativa de ${nombre}`}
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="detalle-experiencia-contenido">
                  <div
                    className="detalle-experiencia-icono"
                    aria-hidden="true"
                  >
                    <IconoHorizonte
                      nombre={nombreIcono}
                      tamaño={30}
                    />
                  </div>

                  <h3>{nombre}</h3>

                  <p>{descripcion}</p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="detalle-sin-actividades">
          <IconoHorizonte
            nombre="experiencia"
            tamaño={42}
          />

          <p>
            Todavía no hay experiencias registradas
            para este destino.
          </p>
        </div>
      )}
    </section>
  );
}

/* =========================================
   PAGINA DE DETALLE
   ========================================= */

export default function DetalleDestino() {
  const { id } = useParams();

  const [destino, setDestino] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarDestino() {
      try {
        setCargando(true);
        setError(null);
        setDestino(null);

        const datos = await obtenerDestinoPorId(
          id,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setDestino(datos);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err.message ||
            'No fue posible cargar el destino.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarDestino();

    return () => {
      controller.abort();
    };
  }, [id, intento]);

  function desplazarseAActividades() {
    const seccion = document.getElementById(
      'actividades'
    );

    if (!seccion) {
      return;
    }

    const movimientoReducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    seccion.scrollIntoView({
      behavior: movimientoReducido
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  }

  /* CARGANDO */

  if (cargando) {
    return (
      <main className="pagina-detalle">
        <div
          className="detalle-estado"
          role="status"
        >
          <span
            className="detalle-spinner"
            aria-hidden="true"
          />

          <h1>
            Preparando tu próxima aventura.
          </h1>

          <p>
            Estamos cargando la información
            de este destino.
          </p>
        </div>
      </main>
    );
  }

  /* ERROR O DESTINO INEXISTENTE */

  if (error || !destino) {
    return (
      <main className="pagina-detalle">
        <div
          className="detalle-estado"
          role="alert"
        >
          <IconoHorizonte
            nombre="busqueda"
            tamaño={48}
          />

          <h1>No encontramos este destino.</h1>

          <p>
            {error ||
              'No hay información disponible para esta ruta.'}
          </p>

          <div className="detalle-estado-acciones">
            <button
              type="button"
              onClick={() =>
                setIntento((valor) => valor + 1)
              }
            >
              Reintentar
            </button>

            <Link to="/destinos">
              <IconoFlecha
                direccion="izquierda"
                tamaño={18}
              />

              Volver al catálogo
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const recursos =
    recursosDestinos[Number(destino.id)];

  /* CONTENIDO PRINCIPAL */

  return (
    <main className="pagina-detalle">
      {/* NAVEGACION */}

      <nav
        className="detalle-breadcrumb"
        aria-label="Ruta de navegación"
      >
        <Link to="/">Inicio</Link>

        <span aria-hidden="true">/</span>

        <Link to="/destinos">Destinos</Link>

        <span aria-hidden="true">/</span>

        <span aria-current="page">
          {destino.nombre}
        </span>
      </nav>

      {/* PORTADA */}

      <header className="detalle-hero">
        {recursos?.portada && (
          <img
            src={recursos.portada}
            alt=""
            aria-hidden="true"
            className="detalle-hero-imagen"
          />
        )}

        <div className="detalle-hero-overlay" />

        <div className="detalle-hero-contenido">
          <span className="detalle-hero-etiqueta">
            {String(destino.pais).toUpperCase()}
            {' '}· HORIZONTE VIAJES
          </span>

          <h1>{destino.nombre}</h1>

          <p>{destino.descripcion}</p>

          <button
            type="button"
            className="detalle-hero-boton"
            onClick={desplazarseAActividades}
          >
            <span>Descubrir experiencias</span>

            <IconoFlecha
              direccion="abajo"
              tamaño={18}
            />
          </button>
        </div>
      </header>

      {/* RESUMEN */}

      <div className="detalle-resumen">
        <div className="detalle-resumen-item">
          <span className="detalle-resumen-label">
            DESTINO
          </span>

          <strong>
            {destino.nombre}
          </strong>
        </div>

        <div className="detalle-resumen-item">
          <span className="detalle-resumen-label">
            PAÍS
          </span>

          <strong>
            {destino.pais}
          </strong>
        </div>

        <div className="detalle-resumen-item">
          <span className="detalle-resumen-label">
            EXPERIENCIA DESTACADA
          </span>

          <strong>
            {destino.actividad ||
              'Experiencias por descubrir'}
          </strong>
        </div>
      </div>

      {/* EXPERIENCIAS REST */}

      <GaleriaActividades destino={destino} />

      {/* VUELOS Y HOTELES GRAPHQL */}

      <ViajesDestino
        key={destino.id}
        destinoId={Number(destino.id)}
      />

      {/* CIERRE */}

      <section className="detalle-cierre">
        <div>
          <span>
            EL MUNDO TE ESPERA
          </span>

          <h2>
            Siempre hay algo nuevo por descubrir.
          </h2>

          <p>
            Continúa explorando destinos y encuentra
            tu próxima aventura.
          </p>
        </div>

        <Link to="/destinos">
          <span>Explorar más destinos</span>

          <IconoFlecha
            direccion="arriba"
            tamaño={18}
          />
        </Link>
      </section>
    </main>
  );
}
