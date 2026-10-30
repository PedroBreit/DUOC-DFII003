
# SuperMarket - Desarrollo Frontend II

## Información del proyecto

**Asignatura:** Desarrollo Frontend II (PFY2202)  
**Institución:** Duoc UC  
**Actividad:** Evaluación Formativa 2 - Semana 2  
**Estudiante:** Pedro Breit  
**Año:** 2026

## Descripción

SuperMarket es una aplicación web desarrollada con React para
gestionar el inventario y simular las compras de un supermercado.

El sistema permite consultar productos, seleccionar artículos
en un carrito de compras, registrar nuevos productos y
administrar las existencias disponibles.

La aplicación utiliza un estado global compartido entre las
distintas páginas y almacenamiento local para conservar los datos.

## Funcionalidades

### Inicio: catálogo y carrito

- Visualización del catálogo de productos.
- Búsqueda por nombre, marca, tipo y categoría.
- Filtrado de productos por categoría.
- Catálogo organizado en dos columnas.
- Desplazamiento interno del catálogo.
- Selección de cantidades mediante botones + y -.
- Validación de cantidades según el stock disponible.
- Cálculo automático del total de la compra.
- Confirmación de compras.
- Descuento de existencias al completar una compra.
- Opción para vaciar el carrito.

### Inventario

- Tabla con los productos registrados.
- Visualización de precios y cantidades.
- Búsqueda y filtrado por categoría.
- Indicadores de productos registrados, stock bajo y agotados.
- Incremento y disminución manual de existencias.
- Restauración del inventario inicial.
- Acceso al registro de nuevos productos.

### Agregar producto

Formulario de registro con los siguientes campos:

- Nombre del producto.
- Marca.
- Tipo de producto.
- Categoría.
- Precio en pesos chilenos.
- Stock inicial.

El formulario incorpora validaciones y registra los productos
en el estado global de la aplicación.

### Páginas adicionales

- Contacto.
- Nosotros.
- Ayuda y preguntas frecuentes.
- Página de error para rutas no encontradas.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React | Desarrollo de interfaces mediante componentes |
| JavaScript | Lógica de la aplicación |
| React Router | Navegación entre páginas |
| Context API | Estado global del inventario |
| useReducer | Gestión de acciones sobre los productos |
| useState | Estados locales y formularios |
| Tailwind CSS | Utilidades de diseño y estilos |
| CSS3 | Estilos personalizados y diseño adaptable |
| Vite | Desarrollo y compilación |
| localStorage | Persistencia de productos y existencias |
| Git y GitHub | Control de versiones |

## Estructura del proyecto

```text
Semana 2/
├── README.md
└── supermercado-frontend-ii/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── InventarioContext.jsx
    │   ├── data/
    │   │   └── initialProducts.js
    │   ├── pages/
    │   │   ├── About.jsx
    │   │   ├── AgregarProducto.jsx
    │   │   ├── AgregarProducto.css
    │   │   ├── Contact.jsx
    │   │   ├── Home.jsx
    │   │   ├── Home.css
    │   │   ├── Inventario.jsx
    │   │   ├── Inventario.css
    │   │   └── NotFound.jsx
    │   ├── services/
    │   │   └── inventarioStorage.js
    │   ├── App.jsx
    │   ├── FAQ.jsx
    │   ├── main.jsx
    │   ├── styles.css
    │   └── tailwind.css
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

## Instalación y ejecución

### Requisitos

- Node.js
- npm

### Clonar el repositorio

```bash
git clone https://github.com/PedroBreit/DUOC-DFII003.git
```

### Abrir el proyecto

```bash
cd "DUOC-DFII003/Semana 2/supermercado-frontend-ii"
```

### Instalar dependencias

```bash
npm install
```

### Iniciar el entorno de desarrollo

```bash
npm run dev
```

### Generar una compilación de producción

```bash
npm run build
```

### Previsualizar la compilación

```bash
npm run preview
```

## Gestión del estado

La aplicación utiliza Context API y useReducer para compartir
el inventario entre las distintas páginas.

Las operaciones principales permiten:

- Registrar nuevos productos.
- Modificar existencias.
- Validar compras.
- Descontar cantidades compradas.
- Restaurar el inventario inicial.

El carrito utiliza un estado local y comparte la información
de productos con el inventario global.

## Persistencia de datos

El inventario se guarda mediante localStorage.

Los cambios se conservan al recargar la aplicación en el
mismo navegador.

La aplicación no utiliza una base de datos externa ni
requiere autenticación.

## Consideraciones

- Las compras son simuladas y no procesan pagos reales.
- El carrito no representa una transacción comercial real.
- El formulario de contacto valida los campos, pero no
  envía mensajes a un servidor.
- El almacenamiento es local al navegador del usuario.
- La restauración del inventario reemplaza los datos
  actuales por los productos iniciales.

## Repositorio

https://github.com/PedroBreit/DUOC-DFII003

---

**Pedro Breit**  
Desarrollo Frontend II - Duoc UC  
2026
