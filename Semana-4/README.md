
# Librería React - Semana 4

## Desarrollo Frontend II (PFY2202)

**Institución:** Duoc UC  
**Asignatura:** Desarrollo Frontend II  
**Experiencia de aprendizaje:** 2  
**Semana:** 4  
**Actividad:** Utilizando tecnologías de integración entre Frontend y Backend  
**Estudiante:** Pedro Breit  

---

## 1. Descripción del proyecto

Librería React es una aplicación web desarrollada utilizando React,
JavaScript y CSS, que permite explorar diferentes categorías de libros
y consultar información de los títulos disponibles.

El proyecto implementa la comunicación entre el frontend y una API REST
simulada mediante Mock Service Worker (MSW).

Esta implementación permite trabajar con datos de ejemplo sin depender
de un backend real.

La aplicación fue desarrollada como parte de la actividad formativa
de la Semana 4 de Desarrollo Frontend II de Duoc UC.

## 2. Objetivos

- Implementar la comunicación entre React y una API REST.
- Simular respuestas de un backend utilizando MSW.
- Obtener información mediante solicitudes HTTP GET.
- Mostrar datos dinámicamente mediante componentes React.
- Implementar navegación utilizando React Router.
- Gestionar estados de carga y errores de comunicación.
- Optimizar las consultas para evitar solicitudes innecesarias.
- Utilizar imágenes locales y estilos CSS para mejorar la interfaz.

## 3. Tecnologías utilizadas

- React: construcción de interfaces mediante componentes.
- JavaScript: lógica de funcionamiento de la aplicación.
- HTML y CSS: estructura y presentación visual.
- React Router: navegación entre páginas y rutas dinámicas.
- Vite: entorno de desarrollo y compilación.
- Mock Service Worker (MSW): simulación de servicios REST.
- Fetch API: realización de solicitudes HTTP.
- Git y GitHub: control de versiones y repositorio del proyecto.

## 4. Funcionalidades

### Página de inicio

Presenta la librería y permite acceder al catálogo.

### Categorías

Muestra seis categorías de libros obtenidas desde la API REST mock:

1. Ficción
2. Ciencia Ficción
3. Historia
4. Tecnología
5. Misterio
6. Fantasía

Cada categoría dispone de una ilustración y un enlace para explorar
sus libros.

### Catálogo de libros

La aplicación contiene 24 libros de ejemplo, distribuidos en seis
categorías.

Cada tarjeta muestra:

- Portada ilustrativa.
- Título del libro.
- Autor.
- Año de publicación.
- Enlace para consultar los detalles.

### Detalle de libro

Permite consultar información específica de cada libro mediante
una ruta dinámica de React Router.

La información incluye título, autor, año de publicación,
descripción y portada.

### Gestión de errores

La aplicación contempla:

- Errores HTTP 404.
- Errores HTTP 500.
- Errores de conexión.
- Mensajes informativos para el usuario.
- Botones para reintentar consultas fallidas.

### Indicadores de carga

Se muestran indicadores visuales mientras se espera la respuesta
de la API REST simulada.

### Optimización de consultas

Los servicios implementan mecanismos sencillos de caché en memoria
para reutilizar datos consultados y evitar solicitudes repetidas.

## 5. Estructura del proyecto

```text
Semana-4/
├── public/
│   └── mockServiceWorker.js
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   │       ├── categorias/
│   │       └── libros/
│   ├── components/
│   │   └── LibroCard.jsx
│   ├── mocks/
│   │   ├── browser.js
│   │   ├── handlers.js
│   │   └── libros.js
│   ├── pages/
│   │   ├── Categorias.jsx
│   │   ├── LibrosCategoria.jsx
│   │   └── DetalleLibro.jsx
│   ├── services/
│   │   ├── categoriasService.js
│   │   └── librosService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 6. Instalación y ejecución

### Requisitos

- Node.js
- npm
- Visual Studio Code o editor equivalente
- Navegador web moderno

### Paso 1. Clonar el repositorio

```bash
git clone https://github.com/PedroBreit/DUOC-DFII003.git
```

### Paso 2. Entrar al proyecto

```bash
cd DUOC-DFII003/Semana-4
```

### Paso 3. Instalar dependencias

```bash
npm install
```

### Paso 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abrir en el navegador:

http://localhost:5173/

MSW se inicia automáticamente para simular las respuestas del backend.

## 7. API REST mock

La aplicación utiliza MSW para interceptar las solicitudes HTTP
y devolver datos simulados.

### Endpoints implementados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/categorias | Obtener categorías |
| GET | /api/libros | Obtener todos los libros |
| GET | /api/libros?categoriaId=1 | Obtener libros de una categoría |
| GET | /api/libros/1 | Obtener un libro específico |

### Ejemplo de respuesta

Solicitud:

```http
GET /api/libros/5
```

Respuesta simulada:

```json
{
  "id": 5,
  "categoriaId": 2,
  "titulo": "Dune",
  "autor": "Frank Herbert",
  "anio": 1965,
  "descripcion": "Una historia épica de política, poder y supervivencia en el planeta Arrakis.",
  "imagen": "dune.webp"
}
```

## 8. Pruebas de errores HTTP

El endpoint de categorías permite simular respuestas de error
para comprobar el comportamiento de la aplicación.

### Error HTTP 404

```http
GET /api/categorias?error=404
```

### Error HTTP 500

```http
GET /api/categorias?error=500
```

### Pruebas desde la interfaz

Durante las pruebas se puede activar la simulación de errores
desde la consola del navegador.

Para simular un error 500:

```javascript
sessionStorage.setItem('simularErrorAPI', '500');
location.reload();
```

Para simular un error 404:

```javascript
sessionStorage.setItem('simularErrorAPI', '404');
location.reload();
```

Después de recargar, ingresar a Categorías.

Para desactivar la simulación:

```javascript
sessionStorage.removeItem('simularErrorAPI');
location.reload();
```

Estas pruebas permiten comprobar los mensajes de error y
el funcionamiento del botón de reintento.

## 9. Rutas de navegación

| Ruta | Página |
|------|--------|
| / | Inicio |
| /categorias | Categorías de libros |
| /categorias/:id | Libros de una categoría |
| /libros/:id | Detalle de un libro |

Las rutas dinámicas permiten acceder a categorías y libros
específicos mediante sus identificadores.

## 10. Validación del proyecto

El proyecto incluye ESLint para revisar el código.

Ejecutar:

```bash
npm run lint
```

Para generar la compilación de producción:

```bash
npm run build
```

Para ejecutar una vista previa de la compilación:

```bash
npm run preview
```

La vista previa utiliza normalmente:

http://localhost:4173/

## 11. Recursos visuales

Las imágenes se almacenan localmente dentro de `src/assets`.

Se incluyen:

- Seis ilustraciones para las categorías.
- Veinticuatro portadas ilustrativas.
- Un ícono SVG de navegación y un favicon de la librería.

Las portadas son ilustraciones originales utilizadas con fines
académicos. No corresponden a las cubiertas editoriales oficiales.

## 12. Resultados de aprendizaje

El proyecto permite aplicar contenidos relacionados con:

**RA2:** Implementación de componentes frontend integrados con
componentes backend para desarrollar soluciones completas.

**IL4:** Comunicación entre componentes frontend y backend
utilizando RESTful.

**IL6:** Configuración de componentes backend mock para realizar
pruebas de integración.

## 13. Repositorio

GitHub:

https://github.com/PedroBreit/DUOC-DFII003

Carpeta del proyecto:

https://github.com/PedroBreit/DUOC-DFII003/tree/main/Semana-4

---

Proyecto académico desarrollado para Desarrollo Frontend II,
Duoc UC.
