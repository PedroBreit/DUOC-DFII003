
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import Categorias from './pages/Categorias';
import LibrosCategoria from './pages/LibrosCategoria';
import DetalleLibro from './pages/DetalleLibro';

import './App.css';

function Inicio() {
  return (
    <main className="inicio">
      <p className="subtitulo">LIBRERÍA DIGITAL</p>
      <h1>Historias que merecen ser descubiertas</h1>

      <p className="descripcion-inicio">
        Explora nuestra selección de libros, descubre nuevos autores
        y encuentra tu próxima lectura favorita.
      </p>

      <NavLink className="boton" to="/categorias">
        Explorar catálogo
      </NavLink>
    </main>
  );
}

function PaginaNoEncontrada() {
  return (
    <main>
      <h1>Página no encontrada</h1>
      <p>La dirección que intentas visitar no existe.</p>
      <NavLink className="boton" to="/">
        Volver al inicio
      </NavLink>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <NavLink to="/" className="logo">
          LIBRERÍA REACT
        </NavLink>

        <nav aria-label="Navegación principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/categorias">Categorías</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:id" element={<LibrosCategoria />} />
        <Route path="/libros/:id" element={<DetalleLibro />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>

      <footer>
        Librería React | Desarrollo Frontend II | Semana 4
      </footer>
    </BrowserRouter>
  );
}
