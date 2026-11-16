
import { http, HttpResponse, delay } from 'msw';
import { libros } from './libros';

const apiBase = `${import.meta.env.BASE_URL}api`;

export const categorias = [
  {
    id: 1,
    nombre: 'Ficción',
    descripcion: 'Historias y novelas que despiertan la imaginación.',
  },
  {
    id: 2,
    nombre: 'Ciencia Ficción',
    descripcion: 'Explora universos, tecnología y futuros posibles.',
  },
  {
    id: 3,
    nombre: 'Historia',
    descripcion: 'Descubre acontecimientos y personajes del pasado.',
  },
  {
    id: 4,
    nombre: 'Tecnología',
    descripcion: 'Aprende sobre programación e innovación.',
  },
  {
    id: 5,
    nombre: 'Misterio',
    descripcion: 'Resuelve enigmas y descubre secretos.',
  },
  {
    id: 6,
    nombre: 'Fantasía',
    descripcion: 'Viaja a mundos mágicos y aventuras extraordinarias.',
  },
];

export const handlers = [
  http.get(`${apiBase}/categorias`, async ({ request }) => {
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

  http.get(`${apiBase}/libros`, async ({ request }) => {
    await delay(600);

    const url = new URL(request.url);
    const categoriaId = url.searchParams.get('categoriaId');

    if (categoriaId === null) {
      return HttpResponse.json(libros);
    }

    const id = Number(categoriaId);

    if (!Number.isInteger(id) || id <= 0) {
      return HttpResponse.json(
        { mensaje: 'Identificador de categoría inválido' },
        { status: 400 }
      );
    }

    const categoriaExiste = categorias.some(
      (categoria) => categoria.id === id
    );

    if (!categoriaExiste) {
      return HttpResponse.json(
        { mensaje: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    const librosFiltrados = libros.filter(
      (libro) => libro.categoriaId === id
    );

    return HttpResponse.json(librosFiltrados);
  }),

  http.get(`${apiBase}/libros/:id`, async ({ params }) => {
    await delay(400);

    const id = Number(params.id);

    const libro = libros.find((item) => item.id === id);

    if (!libro) {
      return HttpResponse.json(
        { mensaje: 'Libro no encontrado' },
        { status: 404 }
      );
    }

    return HttpResponse.json(libro);
  }),
];
