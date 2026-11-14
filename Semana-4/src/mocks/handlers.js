
import { http, HttpResponse, delay } from 'msw';

export const categorias = [
  {
    id: 1,
    nombre: 'Ficción',
    descripcion: 'Historias y novelas que despiertan la imaginación.',
    icono: '📖',
  },
  {
    id: 2,
    nombre: 'Ciencia Ficción',
    descripcion: 'Explora universos, tecnología y futuros posibles.',
    icono: '🚀',
  },
  {
    id: 3,
    nombre: 'Historia',
    descripcion: 'Descubre acontecimientos y personajes del pasado.',
    icono: '🏛️',
  },
  {
    id: 4,
    nombre: 'Tecnología',
    descripcion: 'Aprende sobre programación e innovación.',
    icono: '💻',
  },
  {
    id: 5,
    nombre: 'Misterio',
    descripcion: 'Resuelve enigmas y descubre secretos.',
    icono: '🔎',
  },
  {
    id: 6,
    nombre: 'Fantasía',
    descripcion: 'Viaja a mundos mágicos y aventuras extraordinarias.',
    icono: '✨',
  },
];

export const handlers = [
  http.get('/api/categorias', async ({ request }) => {
    await delay(600);

    const url = new URL(request.url);
    const simularError = url.searchParams.get('error');

    if (simularError === '404') {
      return HttpResponse.json(
        { mensaje: 'Categorías no encontradas' },
        { status: 404 }
      );
    }

    if (simularError === '500') {
      return HttpResponse.json(
        { mensaje: 'Error interno del servidor' },
        { status: 500 }
      );
    }

    return HttpResponse.json(categorias);
  }),
];

