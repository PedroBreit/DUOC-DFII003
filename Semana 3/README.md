
# SuperMarket — Desarrollo Frontend II

## Semana 3: React avanzado

Aplicación web desarrollada con React para la gestión de productos, control de inventario y simulación de compras de un supermercado.

Este proyecto corresponde a la tercera semana de la asignatura **Desarrollo Frontend II (PFY2202)** de Duoc UC.

La aplicación continúa el trabajo desarrollado durante la Semana 2, incorporando nuevas funcionalidades de navegación, consulta de productos, gestión del carrito y mejoras de experiencia de usuario.

---

## Objetivo del proyecto

Desarrollar una aplicación frontend modular que permita consultar productos, filtrarlos por categoría, visualizar sus detalles y administrar sus existencias mediante componentes React reutilizables y un estado compartido.

La aplicación utiliza React Router para gestionar la navegación y Context API junto con `useReducer` para centralizar las operaciones del inventario y del carrito.

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React 18 | Desarrollo de componentes e interfaz |
| JavaScript | Lógica de la aplicación |
| Vite 6 | Entorno de desarrollo y compilación |
| React Router DOM 6 | Navegación entre páginas |
| Context API | Compartir el estado de la aplicación |
| useReducer | Gestión de inventario y carrito |
| Tailwind CSS 4 | Estilos y diseño responsive |
| CSS3 | Estilos globales y específicos |
| localStorage | Persistencia local de datos |
| HTML5 | Estructura semántica |

---

## Funcionalidades implementadas

### 1. Catálogo de productos

La página Inicio permite:

- Visualizar los productos registrados.
- Buscar productos por nombre, marca, tipo o categoría.
- Filtrar los artículos por categoría.
- Consultar el precio y stock disponible.
- Agregar productos al carrito.
- Incrementar o disminuir las cantidades seleccionadas.
- Acceder al detalle de cada producto.

Los controles de cantidad se actualizan según las unidades disponibles.

### 2. Detalle del producto

Cada producto cuenta con una página individual que muestra:

- Nombre del artículo.
- Marca y tipo.
- Categoría.
- Precio unitario en pesos chilenos.
- Stock disponible.
- Cantidad incorporada al carrito.
- Campo para seleccionar unidades.
- Botón para agregar al carrito.

La navegación de regreso es dinámica y depende de la pantalla de origen:

- Desde Inicio, regresa al catálogo.
- Desde Inventario, regresa al inventario.
- Desde Carrito, regresa al carrito.

Cuando se accede directamente a la dirección de un producto, se utiliza Inicio como destino predeterminado.

### 3. Carrito de compras

La aplicación incorpora una página de carrito que permite:

- Visualizar los artículos seleccionados.
- Modificar cantidades con los controles + y −.
- Eliminar artículos individualmente.
- Vaciar el carrito con confirmación.
- Consultar subtotales.
- Calcular el total del pedido.
- Confirmar una compra simulada.

Cuando se agrega un producto al carrito, sus unidades se descuentan inmediatamente del stock disponible.

Si se elimina el producto o se vacía el carrito, las unidades reservadas regresan al inventario.

Al confirmar la compra, el carrito se vacía y las unidades compradas permanecen descontadas, evitando un segundo descuento.

**Importante:** la compra es una simulación académica. No se procesan pagos reales.

### 4. Gestión de inventario

La página Inventario incluye:

- Listado de productos registrados.
- Buscador.
- Filtros por categoría.
- Control de existencias.
- Botones para aumentar o reducir el stock.
- Acceso al detalle de cada artículo.
- Indicadores de productos registrados, stock bajo y productos agotados.
- Restauración del inventario inicial con confirmación.

Los productos presentan estados visuales según las existencias:

| Estado | Stock | Color |
|---|---|---|
| Disponible | 10 o más unidades | Verde |
| Stock bajo | Entre 1 y 9 unidades | Amarillo |
| Sin stock | 0 unidades | Rosa y rojo |

El sistema impide disminuir las existencias por debajo de cero.

### 5. Registro de productos

Desde Inventario se puede acceder al formulario Agregar producto.

El formulario permite registrar:

- Nombre.
- Marca.
- Tipo.
- Categoría.
- Precio.
- Stock inicial.

Se incluyen validaciones para campos obligatorios, valores numéricos y productos duplicados.

Al guardar correctamente, el artículo queda disponible en el inventario y en el catálogo.

### 6. Centro de ayuda

La página de preguntas frecuentes está organizada por categorías:

- Catálogo y productos.
- Carrito de compras.
- Inventario y existencias.
- Datos y funcionamiento.

Cada categoría puede desplegarse para mostrar sus preguntas, y cada pregunta puede abrirse para consultar su respuesta.

El contenido está actualizado de acuerdo con las funcionalidades implementadas.

### 7. Páginas informativas

La aplicación también dispone de:

- Contacto.
- Nosotros.
- Página de error para rutas inexistentes.

---

## Arquitectura de la aplicación

El proyecto utiliza componentes funcionales de React y separación de responsabilidades.

### Gestión del estado

`InventarioContext.jsx` utiliza Context API y `useReducer` para administrar:

- Productos.
- Existencias.
- Carrito de compras.
- Cantidades seleccionadas.
- Total del carrito.
- Operaciones de compra y restauración.

El estado centralizado permite mantener la información sincronizada entre las distintas páginas.

### Navegación

React Router DOM administra las rutas mediante `HashRouter`.

Las rutas principales son:

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/inventario` | Inventario |
| `/agregar-producto` | Agregar producto |
| `/producto/:id` | Detalle del producto |
| `/carrito` | Carrito de compras |
| `/contactanos` | Contacto |
| `/quienes-somos` | Nosotros |
| `/preguntas-frecuentes` | Ayuda |
| `*` | Página no encontrada |

### Persistencia

La aplicación utiliza `localStorage` para conservar los productos, las existencias y el carrito de compras.

Los datos se mantienen al recargar la página, siempre que se utilice el mismo navegador y no se elimine su almacenamiento local.

No se utiliza una base de datos externa ni sincronización entre dispositivos.

---

## Estructura de carpetas

```text
supermercado-frontend-ii/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── context/
│   │   └── InventarioContext.jsx
│   │
│   ├── data/
│   │   └── initialProducts.js
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AgregarProducto.jsx
│   │   ├── AgregarProducto.css
│   │   ├── Carrito.jsx
│   │   ├── Contact.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── FAQ.jsx
│   │   ├── FAQ.css
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Inventario.jsx
│   │   ├── Inventario.css
│   │   └── NotFound.jsx
│   │
│   ├── services/
│   │   └── inventarioStorage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   └── tailwind.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

### Responsabilidades

- `components/`: componentes reutilizables de interfaz.
- `context/`: estado global y operaciones del inventario.
- `data/`: productos iniciales.
- `pages/`: páginas y estilos específicos.
- `services/`: almacenamiento y validación de datos.
- `App.jsx`: definición de las rutas y estructura general.
- `main.jsx`: punto de entrada de React.
- `styles.css`: estilos globales.
- `tailwind.css`: integración de Tailwind CSS.

---

## Instalación y ejecución

### Requisitos

Se necesita Node.js y npm instalados.

### 1. Clonar el repositorio

```bash
git clone https://github.com/PedroBreit/DUOC-DFII003.git
```

### 2. Ingresar al proyecto

```bash
cd "DUOC-DFII003/Semana 3/supermercado-frontend-ii"
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el entorno de desarrollo

```bash
npm run dev
```

Abrir en el navegador la dirección local que indique Vite, incluyendo la ruta base configurada cuando corresponda.

### 5. Generar la versión de producción

```bash
npm run build
```

### 6. Previsualizar la compilación

```bash
npm run preview
```

---

## Diseño responsive

La interfaz se adapta a computadores, tablets y teléfonos móviles.

Se implementaron:

- Distribución adaptable del catálogo.
- Tarjetas de productos.
- Controles de cantidad accesibles.
- Navegación inferior.
- Formularios adaptables.
- Inventario en formato tabla para pantallas amplias.
- Inventario en tarjetas para pantallas pequeñas.
- Categorías y preguntas desplegables en Ayuda.

Los estilos utilizan una identidad visual basada principalmente en azul, blanco y tonos neutros.

---

## Pruebas realizadas

Durante el desarrollo se comprobaron:

- Visualización y búsqueda de productos.
- Filtros por categoría.
- Navegación entre páginas.
- Acceso al detalle de productos.
- Navegación de regreso según el origen.
- Registro y validación de productos nuevos.
- Incremento y reducción de existencias.
- Control de productos agotados.
- Operaciones del carrito.
- Cálculo de subtotales y total.
- Confirmación de compra simulada.
- Restauración del inventario.
- Persistencia mediante localStorage.
- Funcionamiento de las preguntas frecuentes.
- Adaptación a diferentes tamaños de pantalla.

También se verificó la generación de la versión de producción mediante:

```bash
npm run build
```

La compilación final se completó correctamente con Vite.

---

## Alcance y limitaciones

SuperMarket es una aplicación frontend de propósito académico.

Actualmente:

- No dispone de backend.
- No utiliza una base de datos remota.
- No requiere autenticación.
- No procesa pagos reales.
- No sincroniza información entre navegadores o dispositivos.

Las operaciones se realizan localmente en el navegador.

---

## Repositorio

Código fuente disponible en:

https://github.com/PedroBreit/DUOC-DFII003

Proyecto correspondiente a:

`Semana 3/supermercado-frontend-ii/`

---

## Asignatura

**Desarrollo Frontend II — PFY2202**

**Semana 3 — React avanzado**

Duoc UC
