
import { NavLink } from 'react-router-dom';

const navigationItems = [
  {
    to: '/',
    label: 'Inicio',
    icon: '⌂',
    end: true
  },
  {
    to: '/inventario',
    label: 'Inventario',
    icon: '▤'
  },
  {
    to: '/contactanos',
    label: 'Contacto',
    icon: '✉'
  },
  {
    to: '/quienes-somos',
    label: 'Nosotros',
    icon: '♧'
  },
  {
    to: '/preguntas-frecuentes',
    label: 'Ayuda',
    icon: '?'
  }
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
              [
                'nav-item',
                'group',
                'transition-colors',
                'duration-200',
                'focus-visible:ring-2',
                'focus-visible:ring-blue-500',
                'focus-visible:ring-offset-2',
                isActive ? 'active' : ''
              ].join(' ')
            }
          >
            <span
              aria-hidden="true"
              className="
                inline-block
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
