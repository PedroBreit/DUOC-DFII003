
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import Categorias from './pages/Categorias';
import LibrosCategoria from './pages/LibrosCategoria';
import DetalleLibro from './pages/DetalleLibro';

import portadaDune from './assets/images/libros/dune.webp';
import portadaGatsby from './assets/images/libros/el-gran-gatsby.webp';
import portadaHobbit from './assets/images/libros/el-hobbit.webp';

import './App.css';

function Inicio() {
  return (
    <main className="inicio">
      <section className="hero">
        <div className="hero-contenido">
          <div className="hero-etiqueta">
            <span className="hero-linea"></span>
            UNA HISTORIA PARA CADA LECTOR
          </div>

          <h1>
            Entre páginas,
            <br />
            <em>nuevos mundos.</em>
          </h1>

          <p className="hero-descripcion">
            Hay libros que nos acompañan, historias que nos
            transforman y mundos que esperan ser descubiertos.
            Encuentra aquí tu próxima gran lectura.
          </p>

          <NavLink className="boton hero-boton" to="/categorias">
            Descubrir colecciones
            <span aria-hidden="true">→</span>
          </NavLink>

          <div className="hero-pie">
            <span className="hero-punto"></span>
            Literatura para todos los gustos
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circulo"></div>

          <div className="hero-libros">
            <div className="hero-libro hero-libro-izquierdo">
              <img
                src={portadaGatsby}
                alt="Portada ilustrativa de El gran Gatsby"
              />
            </div>

            <div className="hero-libro hero-libro-central">
              <img
                src={portadaDune}
                alt="Portada ilustrativa de Dune"
              />
            </div>

            <div className="hero-libro hero-libro-derecho">
              <img
                src={portadaHobbit}
                alt="Portada ilustrativa de El hobbit"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PaginaNoEncontrada() {
  return (
    <main className="pagina-simple">
      <p className="etiqueta-seccion">PÁGINA NO ENCONTRADA</p>
      <h1>Esta historia no está aquí.</h1>
      <p>
        La página que buscas no existe, pero tenemos muchas
        otras historias esperando por ti.
      </p>

      <NavLink className="boton" to="/categorias">
        Explorar colecciones
      </NavLink>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <header className="navbar">
        <div className="navbar-contenedor">
          <NavLink to="/" className="logo">
            LIBRERÍA <span>REACT</span>
          </NavLink>

          <nav aria-label="Navegación principal" className="nav-links">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/categorias">Colecciones</NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:id" element={<LibrosCategoria />} />
        <Route path="/libros/:id" element={<DetalleLibro />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>

      <footer>
        Librería React · Un mundo de historias para descubrir
      </footer>
    </HashRouter>
  );
}
