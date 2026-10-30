
import React from 'react';

import {
  Link,
  Route,
  Routes
} from 'react-router-dom';

// Componente de navegacion.
import Navbar from './components/Navbar.jsx';

// Paginas de la aplicacion.
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import FAQ from './FAQ.jsx';

export default function App() {
  return (
    <div className="app">

      {/* Encabezado principal */}
      <header className="topbar">
        <div className="shell header-content">

          <Link
            to="/"
            className="brand"
            aria-label="Ir al inicio"
          >
            <span className="brand-mark">
              S
            </span>

            <span>
              Super
              <span className="brand-accent">
                Market
              </span>

              <small>
                INVENTARIO
              </small>
            </span>
          </Link>

          <span className="header-label">
            Administración
          </span>

        </div>
      </header>

      {/* Contenido principal */}
      <main className="shell main">
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/quienes-somos"
            element={<About />}
          />

          <Route
            path="/contactanos"
            element={<Contact />}
          />

          <Route
            path="/preguntas-frecuentes"
            element={<FAQ />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </main>

      {/* Pie de pagina */}
      <footer className="footer">
        © {new Date().getFullYear()} SuperMarket
      </footer>

      {/* Navegacion inferior */}
      <Navbar />

    </div>
  );
}
