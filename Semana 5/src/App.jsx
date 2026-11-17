import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from 'react-router-dom';

import Inicio from './pages/Inicio';
import Destinos from './pages/Destinos';
import DetalleDestino from './pages/DetalleDestino';

import logo from './assets/images/branding/logo-horizonte-viajes.png';
import montanas from './assets/images/decorativos/decoracion-montanas.png';

function IconoBuscar() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function Encabezado() {
  return (
    <header className="header">
      <div className="contenedor header-contenido">
        <NavLink
          to="/"
          className="logo"
          aria-label="Horizonte Viajes, volver al inicio"
        >
          <img
            src={logo}
            alt="Horizonte Viajes"
            className="logo-imagen"
          />
        </NavLink>

        <nav
          className="navegacion"
          aria-label="Navegación principal"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link activo' : 'nav-link'
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/destinos"
            className={({ isActive }) =>
              isActive ? 'nav-link activo' : 'nav-link'
            }
          >
            Explorar destinos
          </NavLink>
        </nav>

        <div className="header-acciones">
          <Link
            to="/destinos"
            className="header-accion"
            title="Explorar destinos"
            aria-label="Explorar destinos turísticos"
          >
            <IconoBuscar />
          </Link>
        </div>
      </div>
    </header>
  );
}

function PiePagina() {
  return (
    <footer className="footer">
      <div className="contenedor footer-contenido">
        <div className="footer-marca">
          <Link
            to="/"
            aria-label="Horizonte Viajes, ir al inicio"
          >
            <img
              src={logo}
              alt="Horizonte Viajes"
              className="footer-logo"
            />
          </Link>

          <p>
            Nuevos lugares.
            <br />
            Nuevas historias.
          </p>
        </div>

        <nav
          className="footer-enlaces"
          aria-label="Enlaces del pie de página"
        >
          <h2>Explorar</h2>
          <Link to="/">Inicio</Link>
          <Link to="/destinos">Destinos</Link>
        </nav>

        <div className="footer-informacion">
          <h2>Horizonte Viajes</h2>
          <p>Desarrollo Frontend II</p>
          <p>React · REST · GraphQL</p>
          <p>Proyecto académico</p>
        </div>

        <img
          src={montanas}
          alt=""
          className="footer-montanas"
          aria-hidden="true"
        />
      </div>

      <div className="footer-base">
        <div className="contenedor footer-base-contenido">
          <span>
            © 2026 Horizonte Viajes
          </span>

          <span>
            Una experiencia creada para explorar.
          </span>
        </div>
      </div>
    </footer>
  );
}

function PaginaNoEncontrada() {
  return (
    <main className="pagina-error">
      <span className="pagina-error-codigo">404</span>

      <h1>Este camino no aparece en el mapa.</h1>

      <p>
        La página que buscas no está disponible.
        Siempre hay nuevos destinos por descubrir.
      </p>

      <Link to="/" className="boton">
        Volver al inicio
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <Encabezado />

        <div className="contenido-principal">
          <Routes>
            <Route path="/" element={<Inicio />} />

            <Route
              path="/destinos"
              element={<Destinos />}
            />

            <Route
              path="/destinos/:id"
              element={<DetalleDestino />}
            />

            <Route
              path="*"
              element={<PaginaNoEncontrada />}
            />
          </Routes>
        </div>

        <PiePagina />
      </div>
    </HashRouter>
  );
}
