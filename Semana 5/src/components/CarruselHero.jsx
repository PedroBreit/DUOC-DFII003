import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import IconoFlecha from './IconoFlecha';

import atacama from '../assets/images/hero/hero-atacama.webp';
import cusco from '../assets/images/hero/hero-cusco.webp';
import rio from '../assets/images/hero/hero-rio.webp';

import './CarruselHero.css';

const diapositivas = [
  {
    id: 1,
    imagen: atacama,
    etiqueta: 'SAN PEDRO DE ATACAMA · CHILE',
    titulo: 'Viaja más allá de lo cotidiano.',
    descripcion:
      'Lugares extraordinarios. Experiencias que permanecen.',
    destinoId: 1,
  },
  {
    id: 2,
    imagen: cusco,
    etiqueta: 'CUSCO · PERÚ',
    titulo: 'Cada lugar tiene una historia.',
    descripcion:
      'Descubre nuevos caminos y vive momentos únicos.',
    destinoId: 2,
  },
  {
    id: 3,
    imagen: rio,
    etiqueta: 'RÍO DE JANEIRO · BRASIL',
    titulo: 'El mundo tiene nuevos horizontes.',
    descripcion:
      'Explora, descubre y déjate sorprender.',
    destinoId: 3,
  },
];

const INTERVALO = 6500;

// Flecha izquierda con trazado SVG propio
function FlechaIzquierda() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="hv-flecha-svg"
    >
      <path d="M15 18L9 12L15 6" />
    </svg>
  );
}

// Flecha derecha con trazado SVG propio
function FlechaDerecha() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="hv-flecha-svg"
    >
      <path d="M9 6L15 12L9 18" />
    </svg>
  );
}

export default function CarruselHero() {
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [movimientoReducido, setMovimientoReducido] =
    useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const actualizar = () => {
      setMovimientoReducido(media.matches);
    };

    actualizar();

    media.addEventListener('change', actualizar);

    return () => {
      media.removeEventListener('change', actualizar);
    };
  }, []);

  useEffect(() => {
    if (pausado || movimientoReducido) {
      return undefined;
    }

    const intervalo = window.setInterval(() => {
      setActual((valor) =>
        (valor + 1) % diapositivas.length
      );
    }, INTERVALO);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [pausado, movimientoReducido, actual]);

  function siguiente() {
    setActual((valor) =>
      (valor + 1) % diapositivas.length
    );
  }

  function anterior() {
    setActual((valor) =>
      (valor - 1 + diapositivas.length) %
      diapositivas.length
    );
  }

  const diapositiva = diapositivas[actual];

  return (
    <section
      className="hv-carousel"
      aria-label="Carrusel de destinos turísticos"
      aria-roledescription="carrusel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={(evento) => {
        if (
          !evento.currentTarget.contains(
            evento.relatedTarget
          )
        ) {
          setPausado(false);
        }
      }}
    >
      {/* Fotografías */}
      <div className="hv-carousel-imagenes">
        {diapositivas.map((item, indice) => (
          <img
            key={item.id}
            src={item.imagen}
            alt=""
            aria-hidden="true"
            className={
              indice === actual
                ? 'hv-carousel-imagen activa'
                : 'hv-carousel-imagen'
            }
            loading={indice === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <div className="hv-carousel-sombra" />

      {/* Contenido */}
      <div className="hv-carousel-contenido">
        <div
          className="hv-carousel-textos"
          key={diapositiva.id}
        >
          <span className="hv-carousel-etiqueta">
            {diapositiva.etiqueta}
          </span>

          <h1>{diapositiva.titulo}</h1>

          <p className="hv-carousel-descripcion">
            {diapositiva.descripcion}
          </p>

          <Link
            to={`/destinos/${diapositiva.destinoId}`}
            className="hv-carousel-boton-principal"
          >
            Descubrir destino

            <IconoFlecha
              direccion="arriba"
              tamaño={18}
            />
          </Link>
        </div>
      </div>

      {/* Control izquierdo */}
      <button
        type="button"
        className="hv-carousel-control hv-carousel-anterior"
        onClick={anterior}
        aria-label="Destino anterior"
      >
        <FlechaIzquierda />
      </button>

      {/* Control derecho */}
      <button
        type="button"
        className="hv-carousel-control hv-carousel-siguiente"
        onClick={siguiente}
        aria-label="Destino siguiente"
      >
        <FlechaDerecha />
      </button>

      {/* Indicadores inferiores */}
      <div
        className="hv-carousel-indicadores"
        role="group"
        aria-label="Seleccionar destino"
      >
        {diapositivas.map((item, indice) => (
          <button
            key={item.id}
            type="button"
            className={
              indice === actual
                ? 'hv-carousel-indicador activo'
                : 'hv-carousel-indicador'
            }
            aria-label={`Mostrar ${item.etiqueta}`}
            aria-current={
              indice === actual ? 'true' : undefined
            }
            onClick={() => setActual(indice)}
          />
        ))}
      </div>
    </section>
  );
}
