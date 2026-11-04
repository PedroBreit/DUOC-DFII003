
import { Link, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';

import Home from './pages/Home.jsx';
import Inventario from './pages/Inventario.jsx';
import AgregarProducto from './pages/AgregarProducto.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Carrito from './pages/Carrito.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import FAQ from './pages/FAQ.jsx';

import { useInventario } from './context/InventarioContext.jsx';

export default function App() {
  const { cartCount } = useInventario();

  return (
    <div className="app">
      <header className="topbar">
        <div className="shell header-content">
          <Link
            to="/"
            className="brand"
            aria-label="Ir al inicio"
          >
            <span className="brand-mark">S</span>

            <span>
              Super
              <span className="brand-accent">
                Market
              </span>
              <small>INVENTARIO</small>
            </span>
          </Link>

          <Link
            to="/carrito"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 font-bold text-blue-700 hover:bg-blue-100"
          >
            <span aria-hidden="true">🛒</span>
            Carrito ({cartCount})
          </Link>
        </div>
      </header>

      <main className="shell main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/inventario"
            element={<Inventario />}
          />

          <Route
            path="/agregar-producto"
            element={<AgregarProducto />}
          />

          <Route
            path="/producto/:id"
            element={<DetalleProducto />}
          />

          <Route
            path="/carrito"
            element={<Carrito />}
          />

          <Route
            path="/contactanos"
            element={<Contact />}
          />

          <Route
            path="/quienes-somos"
            element={<About />}
          />

          <Route
            path="/preguntas-frecuentes"
            element={<FAQ />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} SuperMarket
        {' · '}Desarrollo Frontend II
        {' · '}Semana 3
      </footer>

      <Navbar />
    </div>
  );
}
