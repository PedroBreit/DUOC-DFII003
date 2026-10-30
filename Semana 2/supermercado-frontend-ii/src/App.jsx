import React from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import FAQ from './FAQ.jsx';
const tabs = [
  { to: '/', text: 'Inicio', symbol: '⌂', end: true },
  { to: '/quienes-somos', text: 'Nosotros', symbol: '♧' },
  { to: '/contactanos', text: 'Contacto', symbol: '✉' },
  { to: '/preguntas-frecuentes', text: 'Ayuda', symbol: '?' }
];

export default function App() {
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
              Super<span className="brand-accent">Market</span>
              <small>INVENTARIO</small>
            </span>
          </Link>

          <span className="header-label">
            Administración
          </span>
        </div>
      </header>

      <main className="shell main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<About />} />
          <Route path="/contactanos" element={<Contact />} />
          <Route
            path="/preguntas-frecuentes"
            element={<FAQ />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} SuperMarket
      </footer>

      <nav
        className="bottom-nav"
        aria-label="Navegación principal"
      >
        <div className="nav-inner">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span aria-hidden="true">
                {tab.symbol}
              </span>
              <span>{tab.text}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

