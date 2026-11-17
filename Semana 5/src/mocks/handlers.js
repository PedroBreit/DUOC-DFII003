import { http, HttpResponse, delay } from 'msw';
import { graphqlHandlers } from './graphqlHandlers';

const API_BASE = `${import.meta.env.BASE_URL}api`;

const destinos = [
  {
    id: 1,
    nombre: 'San Pedro de Atacama',
    pais: 'Chile',
    paisCodigo: 'CL',
    descripcion:
      'Descubre el desierto de Atacama, sus paisajes únicos, salares y cielos estrellados.',
    actividad: 'Observación astronómica',
    actividades: [
      'Observación astronómica',
      'Valle de la Luna',
      'Lagunas altiplánicas',
    ],
  },
  {
    id: 2,
    nombre: 'Cusco',
    pais: 'Perú',
    paisCodigo: 'PE',
    descripcion:
      'Explora la historia del Imperio inca y los impresionantes paisajes de los Andes.',
    actividad: 'Visitas culturales',
    actividades: [
      'Machu Picchu',
      'Valle Sagrado',
      'Visitas culturales',
    ],
  },
  {
    id: 3,
    nombre: 'Río de Janeiro',
    pais: 'Brasil',
    paisCodigo: 'BR',
    descripcion:
      'Disfruta de playas, montañas y algunos de los paisajes más conocidos de Brasil.',
    actividad: 'Playas y excursiones',
    actividades: [
      'Cristo Redentor',
      'Playa de Copacabana',
      'Pan de Azúcar',
    ],
  },
  {
    id: 4,
    nombre: 'Buenos Aires',
    pais: 'Argentina',
    paisCodigo: 'AR',
    descripcion:
      'Conoce una ciudad llena de historia, gastronomía, arquitectura y cultura.',
    actividad: 'Recorridos culturales',
    actividades: [
      'Caminito',
      'Teatro Colón',
      'Espectáculos de tango',
    ],
  },
  {
    id: 5,
    nombre: 'Cartagena de Indias',
    pais: 'Colombia',
    paisCodigo: 'CO',
    descripcion:
      'Explora la ciudad amurallada y disfruta de la costa caribeña colombiana.',
    actividad: 'Turismo histórico',
    actividades: [
      'Ciudad amurallada',
      'Islas del Rosario',
      'Castillo de San Felipe',
    ],
  },
  {
    id: 6,
    nombre: 'Cancún',
    pais: 'México',
    paisCodigo: 'MX',
    descripcion:
      'Descubre las playas del Caribe mexicano y su patrimonio cultural.',
    actividad: 'Playas y aventura',
    actividades: [
      'Chichén Itzá',
      'Isla Mujeres',
      'Visitas a cenotes',
    ],
  },
];

const paises = [
  { codigo: 'CL', nombre: 'Chile' },
  { codigo: 'PE', nombre: 'Perú' },
  { codigo: 'BR', nombre: 'Brasil' },
  { codigo: 'AR', nombre: 'Argentina' },
  { codigo: 'CO', nombre: 'Colombia' },
  { codigo: 'MX', nombre: 'México' },
];

const actividades = destinos.flatMap((destino) =>
  destino.actividades.map((nombre, indice) => ({
    id: `${destino.id}-${indice + 1}`,
    nombre,
    destinoId: destino.id,
    destino: destino.nombre,
  }))
);

export const handlers = [
  // REST: obtener todos los destinos
  http.get(`${API_BASE}/destinos`, async () => {
    await delay(400);

    return HttpResponse.json(destinos);
  }),

  // REST: obtener un destino por ID
  http.get(`${API_BASE}/destinos/:id`, async ({ params }) => {
    await delay(300);

    const destino = destinos.find(
      (item) => item.id === Number(params.id)
    );

    if (!destino) {
      return HttpResponse.json(
        { mensaje: 'Destino no encontrado' },
        { status: 404 }
      );
    }

    return HttpResponse.json(destino);
  }),

  // REST: obtener países disponibles
  http.get(`${API_BASE}/paises`, async () => {
    await delay(300);

    return HttpResponse.json(paises);
  }),

  // REST: obtener actividades populares
  http.get(`${API_BASE}/actividades`, async () => {
    await delay(300);

    return HttpResponse.json(actividades);
  }),

  // GraphQL: operaciones de vuelos y hoteles
  ...graphqlHandlers,
];
