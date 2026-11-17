
import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import IconoHorizonte from './IconoHorizonte';

import hotelAtacama from '../assets/images/hoteles/hotel-desierto-andino.png';
import hotelCusco from '../assets/images/hoteles/hotel-valle-imperial.png';
import hotelRio from '../assets/images/hoteles/hotel-costa-carioca.png';
import hotelBuenosAires from '../assets/images/hoteles/hotel-buenos-aires-centro.png';
import hotelCartagena from '../assets/images/hoteles/hotel-cartagena-colonial.png';
import hotelCancun from '../assets/images/hoteles/hotel-riviera-maya.png';

import './ViajesDestino.css';

/* =========================================
   CONSULTAS GRAPHQL
   ========================================= */

const GET_FLIGHTS = gql`
  query GetFlightsByDestination($destinoId: Int!) {
    vuelos(destinoId: $destinoId) {
      id
      aerolinea
      origen
      destino
      fecha
      precio
      disponibles
    }
  }
`;

const GET_HOTELS = gql`
  query GetHotelsByDestination($destinoId: Int!) {
    hoteles(destinoId: $destinoId) {
      id
      nombre
      ubicacion
      precioNoche
      habitacionesDisponibles
    }
  }
`;

/* =========================================
   RECURSOS GRAFICOS
   ========================================= */

const imagenesHoteles = {
  1: hotelAtacama,
  2: hotelCusco,
  3: hotelRio,
  4: hotelBuenosAires,
  5: hotelCartagena,
  6: hotelCancun,
};

/* =========================================
   FORMATO DE DATOS
   ========================================= */

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

function formatearPrecio(valor) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return 'Precio por confirmar';
  }

  return formatoPrecio.format(numero);
}

function formatearFecha(valor) {
  if (!valor) {
    return 'Fecha por confirmar';
  }

  const fechaTexto = String(valor);

  if (/^\d{4}-\d{2}-\d{2}$/.test(fechaTexto)) {
    const [anio, mes, dia] = fechaTexto
      .split('-')
      .map(Number);

    const fecha = new Date(
      Date.UTC(anio, mes - 1, dia)
    );

    if (
      !Number.isNaN(fecha.getTime()) &&
      fecha.getUTCFullYear() === anio &&
      fecha.getUTCMonth() === mes - 1 &&
      fecha.getUTCDate() === dia
    ) {
      return new Intl.DateTimeFormat('es-CL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(fecha);
    }
  }

  return fechaTexto;
}

/* =========================================
   ICONOS SVG AUXILIARES
   ========================================= */

function IconoCalendario() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
      />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function IconoUbicacion() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconoInformacion() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

/* =========================================
   DISPONIBILIDAD
   ========================================= */

function Disponibilidad({ cantidad, tipo }) {
  const total = Math.max(0, Number(cantidad) || 0);
  const disponible = total > 0;

  const unidad =
    tipo === 'asientos'
      ? total === 1
        ? 'asiento disponible'
        : 'asientos disponibles'
      : total === 1
        ? 'habitación disponible'
        : 'habitaciones disponibles';

  return (
    <span
      className={
        disponible
          ? 'viaje-disponibilidad disponible'
          : 'viaje-disponibilidad agotado'
      }
    >
      <span
        className="viaje-disponibilidad-punto"
        aria-hidden="true"
      />

      {disponible
        ? `${total} ${unidad}`
        : 'Sin disponibilidad'}
    </span>
  );
}

/* =========================================
   TARJETA DE VUELO
   ========================================= */

function TarjetaVuelo({ vuelo }) {
  return (
    <article className="viaje-vuelo-card">
      <div className="viaje-vuelo-superior">
        <div className="viaje-vuelo-aerolinea">
          <div className="viaje-vuelo-icono">
            <IconoHorizonte
              nombre="vuelo"
              tamaño={41}
            />
          </div>

          <div className="viaje-vuelo-identidad">
            <span className="viaje-mini-etiqueta">
              AEROLÍNEA
            </span>

            <h3>{vuelo.aerolinea}</h3>
          </div>
        </div>

        <span className="viaje-vuelo-etiqueta">
          VUELO
        </span>
      </div>

      <div className="viaje-vuelo-ruta">
        <div className="viaje-vuelo-origen">
          <span>ORIGEN</span>
          <strong>{vuelo.origen}</strong>
        </div>

        <div
          className="viaje-vuelo-trayecto"
          aria-hidden="true"
        >
          <span className="viaje-vuelo-linea" />

          <IconoHorizonte
            nombre="ruta"
            tamaño={30}
          />

          <span className="viaje-vuelo-linea" />
        </div>

        <div className="viaje-vuelo-destino">
          <span>DESTINO</span>
          <strong>{vuelo.destino}</strong>
        </div>
      </div>

      <div className="viaje-vuelo-fecha">
        <IconoCalendario />

        <span>
          {formatearFecha(vuelo.fecha)}
        </span>
      </div>

      <div className="viaje-vuelo-inferior">
        <div className="viaje-vuelo-precio">
          <span className="viaje-precio-label">
            POR PERSONA
          </span>

          <p className="viaje-precio">
            {formatearPrecio(vuelo.precio)}
          </p>
        </div>

        <Disponibilidad
          cantidad={vuelo.disponibles}
          tipo="asientos"
        />
      </div>
    </article>
  );
}

/* =========================================
   TARJETA DE HOTEL
   ========================================= */

function TarjetaHotel({ hotel, destinoId }) {
  const imagen = imagenesHoteles[destinoId];

  return (
    <article className="viaje-hotel-card">
      <div className="viaje-hotel-imagen">
        {imagen && (
          <img
            src={imagen}
            alt={`Imagen ilustrativa de alojamiento en ${hotel.ubicacion}`}
            loading="lazy"
          />
        )}

        <div className="viaje-hotel-distintivo">
          <IconoHorizonte
            nombre="hotel"
            tamaño={23}
          />

          <span>ALOJAMIENTO</span>
        </div>
      </div>

      <div className="viaje-hotel-contenido">
        <span className="viaje-mini-etiqueta">
          DESCANSA Y DESCUBRE
        </span>

        <h3>{hotel.nombre}</h3>

        <p className="viaje-hotel-ubicacion">
          <IconoUbicacion />

          <span>{hotel.ubicacion}</span>
        </p>

        <div className="viaje-hotel-inferior">
          <div>
            <span className="viaje-precio-label">
              POR NOCHE
            </span>

            <p className="viaje-precio">
              {formatearPrecio(hotel.precioNoche)}
            </p>
          </div>

          <Disponibilidad
            cantidad={hotel.habitacionesDisponibles}
            tipo="habitaciones"
          />
        </div>
      </div>
    </article>
  );
}

/* =========================================
   CARGA, ERRORES Y ESTADO VACIO
   ========================================= */

function MensajeConsulta({
  cargando,
  error,
  vacio,
  tipo,
  reintentar,
}) {
  if (cargando) {
    return (
      <div
        className="viajes-estado"
        role="status"
      >
        <span
          className="detalle-spinner"
          aria-hidden="true"
        />

        <h3>Preparando tu viaje.</h3>

        <p>
          Consultando {tipo} disponibles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="viajes-estado"
        role="alert"
      >
        <h3>
          No pudimos cargar los {tipo}.
        </h3>

        <p>{error.message}</p>

        <button
          type="button"
          className="viajes-reintentar"
          onClick={reintentar}
        >
          Reintentar consulta
        </button>
      </div>
    );
  }

  if (vacio) {
    return (
      <div className="viajes-estado">
        <h3>Sin resultados por ahora.</h3>

        <p>
          No hay {tipo} registrados
          para este destino.
        </p>
      </div>
    );
  }

  return null;
}

/* =========================================
   COMPONENTE PRINCIPAL
   ========================================= */

export default function ViajesDestino({ destinoId }) {
  const [pestana, setPestana] = useState('vuelos');

  const {
    data: datosVuelos,
    loading: cargandoVuelos,
    error: errorVuelos,
    refetch: recargarVuelos,
  } = useQuery(GET_FLIGHTS, {
    variables: { destinoId },
    errorPolicy: 'none',
  });

  const {
    data: datosHoteles,
    loading: cargandoHoteles,
    error: errorHoteles,
    refetch: recargarHoteles,
  } = useQuery(GET_HOTELS, {
    variables: { destinoId },
    errorPolicy: 'none',
  });

  const vuelos = datosVuelos?.vuelos || [];
  const hoteles = datosHoteles?.hoteles || [];

  return (
    <section
      className="viajes-seccion"
      aria-labelledby="titulo-viajes"
    >
      <div className="detalle-seccion-encabezado">
        <div>
          <span className="detalle-eyebrow">
            PLANIFICA TU VIAJE
          </span>

          <h2 id="titulo-viajes">
            Todo listo para explorar.
          </h2>

          <p>
            Consulta vuelos y alojamientos disponibles
            para este destino.
          </p>
        </div>
      </div>

      {/* PESTAÑAS */}

      <div
        className="viajes-pestanas"
        role="group"
        aria-label="Tipo de servicio"
      >
        <button
          type="button"
          className={
            pestana === 'vuelos'
              ? 'viajes-pestana activa'
              : 'viajes-pestana'
          }
          aria-pressed={pestana === 'vuelos'}
          onClick={() => setPestana('vuelos')}
        >
          <span className="viajes-pestana-icono">
            <IconoHorizonte
              nombre="vuelo"
              tamaño={25}
            />
          </span>

          <span>Vuelos</span>

          {!cargandoVuelos && !errorVuelos && (
            <span className="viajes-pestana-cantidad">
              {vuelos.length}
            </span>
          )}
        </button>

        <button
          type="button"
          className={
            pestana === 'hoteles'
              ? 'viajes-pestana activa'
              : 'viajes-pestana'
          }
          aria-pressed={pestana === 'hoteles'}
          onClick={() => setPestana('hoteles')}
        >
          <span className="viajes-pestana-icono">
            <IconoHorizonte
              nombre="hotel"
              tamaño={25}
            />
          </span>

          <span>Hoteles</span>

          {!cargandoHoteles && !errorHoteles && (
            <span className="viajes-pestana-cantidad">
              {hoteles.length}
            </span>
          )}
        </button>
      </div>

      {/* PANEL DE VUELOS */}

      {pestana === 'vuelos' && (
        <div
          className="viajes-panel"
          aria-label="Resultados de vuelos"
        >
          {cargandoVuelos ||
          errorVuelos ||
          vuelos.length === 0 ? (
            <MensajeConsulta
              cargando={cargandoVuelos}
              error={errorVuelos}
              vacio={vuelos.length === 0}
              tipo="vuelos"
              reintentar={() => {
                void recargarVuelos();
              }}
            />
          ) : (
            <div className="viajes-resultados-grid">
              {vuelos.map((vuelo) => (
                <TarjetaVuelo
                  key={vuelo.id}
                  vuelo={vuelo}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* PANEL DE HOTELES */}

      {pestana === 'hoteles' && (
        <div
          className="viajes-panel"
          aria-label="Resultados de hoteles"
        >
          {cargandoHoteles ||
          errorHoteles ||
          hoteles.length === 0 ? (
            <MensajeConsulta
              cargando={cargandoHoteles}
              error={errorHoteles}
              vacio={hoteles.length === 0}
              tipo="hoteles"
              reintentar={() => {
                void recargarHoteles();
              }}
            />
          ) : (
            <div className="viajes-resultados-grid">
              {hoteles.map((hotel) => (
                <TarjetaHotel
                  key={hotel.id}
                  hotel={hotel}
                  destinoId={destinoId}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* NOTA ACADEMICA */}

      <div className="viajes-nota">
        <span className="viajes-nota-icono">
          <IconoInformacion />
        </span>

        <p>
          Información simulada con fines académicos.
          Los precios y la disponibilidad no representan
          ofertas comerciales reales.
        </p>
      </div>
    </section>
  );
}
