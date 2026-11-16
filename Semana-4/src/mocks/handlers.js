
import { http, HttpResponse, delay } from 'msw';
import { libros } from './libros';

// Datos simulados de las categorías
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

// Controladores de la API REST simulada
export const handlers = [

  // GET /api/categorias
  // Devuelve todas las categorías
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

  // GET /api/libros
  // Devuelve todos los libros o filtra por categoría
  http.get('/api/libros', async ({ request }) => {
    await delay(600);

    const url = new URL(request.url);
    const categoriaId = url.searchParams.get('categoriaId');

    // Si no se indica una categoría, devuelve todos los libros
    if (categoriaId === null) {
      return HttpResponse.json(libros);
    }

    // Validar el identificador de categoría
    const id = Number(categoriaId);

    if (!Number.isInteger(id) || id <= 0) {
      return HttpResponse.json(
        { mensaje: 'Identificador de categoría inválido' },
        { status: 400 }
      );
    }

    // Comprobar que la categoría exista
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

  // GET /api/libros/:id
  // Devuelve la información de un libro específico
  http.get('/api/libros/:id', async ({ params }) => {
    await delay(400);

    const id = Number(params.id);

    const libro = libros.find(
      (item) => item.id === id
    );

    if (!libro) {
      return HttpResponse.json(
        { mensaje: 'Libro no encontrado' },
        { status: 404 }
      );
    }

    return HttpResponse.json(libro);
  }),

];
