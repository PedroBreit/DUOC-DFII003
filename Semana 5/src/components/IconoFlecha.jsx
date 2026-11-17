import './IconoFlecha.css';

const rutas = {
  derecha: 'M5 12h14m-6-6 6 6-6 6',
  izquierda: 'M19 12H5m6-6-6 6 6 6',
  arriba: 'M5 17 17 5M7 5h10v10',
  abajo: 'M12 4v16m-6-6 6 6 6-6',
  siguiente: 'M9 5l7 7-7 7',
  anterior: 'M15 5l-7 7 7 7',
};

export default function IconoFlecha({
  direccion = 'derecha',
  tamaño = 20,
  className = '',
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={tamaño}
      height={tamaño}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`icono-flecha icono-flecha-${direccion} ${className}`}
    >
      <path d={rutas[direccion] || rutas.derecha} />
    </svg>
  );
}
