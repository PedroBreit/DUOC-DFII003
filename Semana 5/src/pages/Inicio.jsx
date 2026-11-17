import { Link } from 'react-router-dom';

import CarruselHero from '../components/CarruselHero';
import IconoHorizonte from '../components/IconoHorizonte';
import IconoFlecha from '../components/IconoFlecha';

import './Inicio.css';

const beneficios = [
  {
    numero: '01',
    icono: 'destino',
    titulo: 'Explora',
    descripcion:
      'Descubre destinos únicos y experiencias para recordar.',
  },
  {
    numero: '02',
    icono: 'vuelo',
    titulo: 'Planifica',
    descripcion:
      'Consulta vuelos y alojamientos para tu próximo viaje.',
  },
  {
    numero: '03',
    icono: 'experiencia',
    titulo: 'Inspírate',
    descripcion:
      'Encuentra nuevas formas de descubrir el mundo.',
  },
];

export default function Inicio() {
  return (
    <main className="pagina-inicio">
      <CarruselHero />

      <section
        id="experiencias"
        className="inicio-beneficios"
        aria-labelledby="titulo-beneficios"
      >
        <div className="inicio-seccion-titulo">
          <span className="inicio-subtitulo">
            VIAJAR ES DESCUBRIR
          </span>

          <h2 id="titulo-beneficios">
            Una forma simple de explorar.
          </h2>

          <p>
            Destinos, experiencias y opciones de viaje
            en un solo lugar.
          </p>
        </div>

        <div className="inicio-beneficios-grid">
          {beneficios.map((beneficio) => (
            <article
              className="inicio-beneficio"
              key={beneficio.numero}
            >
              <div className="inicio-beneficio-superior">
                <div className="inicio-beneficio-icono">
                  <IconoHorizonte
                    nombre={beneficio.icono}
                    tamaño={47}
                  />
                </div>
              </div>

              <h3>{beneficio.titulo}</h3>

              <p>{beneficio.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="inicio-cta"
        aria-labelledby="titulo-cta"
      >
        <span className="inicio-subtitulo">
          EL VIAJE COMIENZA CONTIGO
        </span>

        <h2 id="titulo-cta">
          Tu próximo destino te espera.
        </h2>

        <p>
          Explora lugares que inspiran y comienza
          a imaginar tu próxima aventura.
        </p>

        <Link
          to="/destinos"
          className="inicio-cta-boton"
        >
          Explorar destinos

          <IconoFlecha
            direccion="arriba"
            tamaño={18}
          />
        </Link>
      </section>
    </main>
  );
}
