
import { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import { useInventario } from './context/InventarioContext.jsx';

// Carga diferida de páginas con React.lazy.
const Home = lazy(() => import('./pages/Home.jsx'));

const Inventario = lazy(() =>
  import('./pages/Inventario.jsx')
);

const AgregarProducto = lazy(() =>
  import('./pages/AgregarProducto.jsx')
);

const DetalleProducto = lazy(() =>
  import('./pages/DetalleProducto.jsx')
);

const Carrito = lazy(() =>
  import('./pages/Carrito.jsx')
);

const About = lazy(() =>
  import('./pages/About.jsx')
);

const Contact = lazy(() =>
  import('./pages/Contact.jsx')
);

const FAQ = lazy(() =>
  import('./pages/FAQ.jsx')
);

const NotFound = lazy(() =>
  import('./pages/NotFound.jsx')
);

// Pantalla temporal mientras se carga una página.
function LoadingPage() {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-8"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"
        aria-hidden="true"
      />

      <p className="text-sm font-semibold text-slate-600">
        Cargando contenido...
      </p>
    </div>
  );
}

export default function App() {
  const { cartCount } = useInventario();

  return (
    <div className="app">
      {/* ENCABEZADO */}
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

      {/* CONTENIDO Y RUTAS */}
      <main className="shell main">
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/carrito"
              element={<Carrito />}
            />

            <Route
              path="/inventario"
              element={<Inventario />}
            />

            <Route
              path="/producto/:id"
              element={<DetalleProducto />}
            />

            <Route
              path="/agregar-producto"
              element={<AgregarProducto />}
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

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </main>

      {/* PIE DE PÁGINA */}
      <footer className="footer">
        © {new Date().getFullYear()} SuperMarket
        {' · '}Desarrollo Frontend II
        {' · '}Semana 3
      </footer>

      {/* NAVEGACIÓN INFERIOR */}
      <Navbar />
    </div>
  );
}
