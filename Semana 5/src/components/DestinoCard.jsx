import { Link } from 'react-router-dom';

import IconoHorizonte from './IconoHorizonte';
import IconoFlecha from './IconoFlecha';

import imagenAtacama from '../assets/images/destinos/destino-atacama.webp';
import imagenCusco from '../assets/images/destinos/destino-cusco.webp';
import imagenRio from '../assets/images/destinos/destino-rio.webp';
import imagenBuenosAires from '../assets/images/destinos/destino-buenos-aires.webp';
import imagenCartagena from '../assets/images/destinos/destino-cartagena.webp';
import imagenCancun from '../assets/images/destinos/destino-cancun.webp';

const imagenesDestinos = {
  1: imagenAtacama,
  2: imagenCusco,
  3: imagenRio,
  4: imagenBuenosAires,
  5: imagenCartagena,
  6: imagenCancun,
};

function IconoCorazon({ activo }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
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

export default function DestinoCard({
  destino,
  esFavorito,
  onToggleFavorito,
}) {
  const imagen = imagenesDestinos[Number(destino.id)];

  return (
    <article className="destino-card">
      <div className="destino-card-imagen">
        {imagen && (
          <img
            src={imagen}
            alt={`Vista turística de ${destino.nombre}, ${destino.pais}`}
            loading="lazy"
          />
        )}

        <span className="destino-card-pais">
          {destino.pais}
        </span>

        <button
          type="button"
          className={
            esFavorito
              ? 'destino-favorito activo'
              : 'destino-favorito'
          }
          onClick={() => onToggleFavorito(destino.id)}
          aria-label={
            esFavorito
              ? `Quitar ${destino.nombre} de favoritos`
              : `Agregar ${destino.nombre} a favoritos`
          }
          aria-pressed={Boolean(esFavorito)}
          title={
            esFavorito
              ? 'Quitar de favoritos'
              : 'Agregar a favoritos'
          }
        >
          <IconoCorazon activo={esFavorito} />
        </button>
      </div>

      <div className="destino-card-contenido">
        <div className="destino-card-etiqueta">
          <IconoHorizonte
            nombre="destino"
            tamaño={23}
          />
          <span>
            DESTINO · {String(destino.pais).toUpperCase()}
          </span>
        </div>

        <h2>{destino.nombre}</h2>

        <p className="destino-card-descripcion">
          {destino.descripcion}
        </p>

        <div className="destino-card-actividad">
          <IconoHorizonte
            nombre="experiencia"
            tamaño={28}
          />

          <span>
            {destino.actividad || 'Experiencias únicas'}
          </span>
        </div>

        <div className="destino-card-pie">
          <Link
            to={`/destinos/${destino.id}`}
            className="destino-card-enlace"
            aria-label={`Descubrir ${destino.nombre}`}
          >
            <span>Descubrir destino</span>

            <span className="destino-card-flecha">
              <IconoFlecha
                direccion="arriba"
                tamaño={18}
              />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
