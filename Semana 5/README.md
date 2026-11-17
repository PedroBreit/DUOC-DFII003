# Horizonte Viajes - Frontend II / Semana 5

Aplicacion web academica de una agencia de viajes construida con React y Vite. Permite explorar destinos turisticos, filtrar el catalogo, consultar actividades y visualizar vuelos y hoteles simulados.

## Funcionalidades

- Inicio con carrusel de destinos y navegacion.
- Catalogo de seis destinos, busqueda, filtro por pais y orden alfabetico.
- Favoritos persistidos en `localStorage`.
- Detalle de cada destino con tres experiencias y fotografias locales.
- Consultas GraphQL de vuelos y hoteles por destino, con precios CLP y disponibilidad.
- Estados de carga, error, reintento y ruta 404.
- Interfaz responsive e iconografia original de Horizonte Viajes.

## Tecnologias

React 19, Vite 8, React Router (HashRouter), Apollo Client 4, GraphQL, Mock Service Worker (MSW 3), CSS y JavaScript.

## Ejecutar localmente

Se requiere Node.js compatible con Vite 8 y npm.

```bash
npm ci
npm run dev
```

Abrir la URL mostrada por Vite. La aplicacion usa una ruta base configurada en `vite.config.js`.

## Validaciones

```bash
npm run lint
npm run build
npm run preview
```

## Servicios simulados

Los endpoints se resuelven localmente mediante MSW; no hay backend comercial ni reservas reales:

| Metodo | Endpoint relativo | Descripcion |
| --- | --- | --- |
| GET | `api/destinos` | Catalogo completo |
| GET | `api/destinos/:id` | Detalle de un destino |
| GET | `api/paises` | Paises disponibles |
| GET | `api/actividades` | Actividades por destino |
| POST | `graphql` | Consultas `GetFlightsByDestination` y `GetHotelsByDestination` |

Los endpoints se prefijan con `import.meta.env.BASE_URL`. El archivo `public/mockServiceWorker.js` es necesario para las consultas simuladas. Las tarifas y disponibilidades son datos ficticios con fines educativos.

## Estructura

- `src/pages/`: Inicio, catalogo y detalle.
- `src/components/`: tarjetas, carrusel, iconos y viajes.
- `src/services/`: cliente Apollo y consultas REST.
- `src/mocks/`: datos y handlers REST/GraphQL.
- `src/assets/images/`: fotografias e iconos del proyecto.
- `public/`: favicon y service worker.

## Preparacion para GitHub Pages

La base Vite es `/DUOC-DFII003/semana-05/`. El script `npm run deploy` (que **no se ejecuta automaticamente**) generara el build y publicara su contenido en `semana-05/` dentro de la rama `gh-pages`, conservando otras rutas existentes gracias a `--add`. Revisa previamente la configuracion de Pages del repositorio.

```bash
npm run build
npm run deploy
```

**No ejecutar el despliegue hasta aprobar la publicacion.**

## Entrega

Proyecto academico de Frontend II, Semana 5. Repositorio: <https://github.com/PedroBreit/DUOC-DFII003>.
