
import { NavLink } from 'react-router-dom';

const navigationItems = [
  { to: '/', label: 'Inicio', icon: '⌂', end: true },
  { to: '/inventario', label: 'Inventario', icon: '▤' },
  { to: '/contactanos', label: 'Contacto', icon: '✉' },
  { to: '/quienes-somos', label: 'Nosotros', icon: '♧' },
  { to: '/preguntas-frecuentes', label: 'Ayuda', icon: '?' }
];

export default function Navbar() {
  return (
    <nav
      className="bottom-nav"
      aria-label="Navegación principal"
    >
      <div className="nav-inner">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
