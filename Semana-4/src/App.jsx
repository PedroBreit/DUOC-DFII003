
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Categorias from './pages/Categorias';
import './App.css';

function Inicio() {
  return (
    <main className="inicio">
      <h1>Bienvenido a Librería React</h1>
      <p>Descubre historias, conocimientos y nuevos mundos.</p>
      <NavLink className="boton" to="/categorias">
        Explorar categorías
      </NavLink>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <NavLink to="/" className="logo">📚 Librería React</NavLink>
        <nav aria-label="Navegación principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/categorias">Categorías</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="*" element={<h1>Página no encontrada (404)</h1>} />
      </Routes>

      <footer>Semana 4 · Desarrollo Frontend II · Duoc UC</footer>
    </BrowserRouter>
  );
}
