import iconoDestino from '../assets/images/icons/icono-destino.png';
import iconoVuelo from '../assets/images/icons/icono-vuelo.png';
import iconoHotel from '../assets/images/icons/icono-hotel.png';
import iconoExperiencia from '../assets/images/icons/icono-experiencia.png';
import iconoAventura from '../assets/images/icons/icono-aventura.png';
import iconoFavorito from '../assets/images/icons/icono-favorito.png';
import iconoBusqueda from '../assets/images/icons/icono-busqueda.png';
import iconoReserva from '../assets/images/icons/icono-reserva.png';
import iconoEquipaje from '../assets/images/icons/icono-equipaje.png';
import iconoPlaya from '../assets/images/icons/icono-playa.png';
import iconoRuta from '../assets/images/icons/icono-ruta.png';
import iconoCrucero from '../assets/images/icons/icono-crucero.png';

const iconos = {
  destino: iconoDestino,
  vuelo: iconoVuelo,
  hotel: iconoHotel,
  experiencia: iconoExperiencia,
  aventura: iconoAventura,
  favorito: iconoFavorito,
  busqueda: iconoBusqueda,
  reserva: iconoReserva,
  equipaje: iconoEquipaje,
  playa: iconoPlaya,
  ruta: iconoRuta,
  crucero: iconoCrucero,
};

export default function IconoHorizonte({
  nombre,
  tamaño = 32,
  className = '',
  alt = '',
}) {
  const imagen = iconos[nombre];

  if (!imagen) {
    return null;
  }

  return (
    <img
      src={imagen}
      alt={alt}
      aria-hidden={alt === '' ? 'true' : undefined}
      className={`icono-horizonte ${className}`}
      width={tamaño}
      height={tamaño}
      style={{
        width: tamaño,
        height: tamaño,
        objectFit: 'contain',
        flexShrink: 0,
      }}
    />
  );
}
