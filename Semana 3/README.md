
# SuperMarket — Desarrollo Frontend II

## Semana 3: React avanzado

Aplicación web desarrollada con React para la gestión de productos, control de inventario y simulación de compras de un supermercado.

Este proyecto corresponde a la tercera semana de la asignatura **Desarrollo Frontend II (PFY2202)** de Duoc UC.

La aplicación continúa el trabajo desarrollado durante la Semana 2, incorporando navegación avanzada, consulta de productos, gestión del carrito, componentes reutilizables y mejoras de experiencia de usuario.

---

## Aplicación publicada

**GitHub Pages:**

https://pedrobreit.github.io/DUOC-DFII003/semana-03/

**Código fuente:**

https://github.com/PedroBreit/DUOC-DFII003/tree/main/Semana%203/supermercado-frontend-ii

---

## Objetivo del proyecto

Desarrollar una aplicación frontend modular que permita consultar productos, filtrarlos por categoría, visualizar sus detalles y administrar sus existencias mediante componentes React reutilizables y un estado compartido.

La aplicación utiliza React Router para gestionar la navegación, Context API junto con `useReducer` para centralizar el estado, `React.lazy()` con `Suspense` para cargar las páginas de forma diferida y hooks personalizados para reutilizar la lógica de filtrado.

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React 18 | Componentes funcionales e interfaz |
| JavaScript | Lógica de la aplicación |
| Vite 6 | Desarrollo y compilación |
| React Router DOM 6 | Navegación entre páginas |
| React.lazy | Carga diferida de módulos |
| Suspense | Indicador durante la carga de páginas |
| Context API | Estado compartido |
| useReducer | Gestión de inventario y carrito |
| Hooks personalizados | Reutilización de lógica |
| Tailwind CSS 4 | Utilidades y diseño responsive |
| CSS3 | Estilos globales y específicos |
| localStorage | Persistencia local de datos |
| HTML5 | Estructura semántica |
| GitHub Pages | Publicación de la aplicación |

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

Los controles de cantidad se actualizan según las unidades disponibles y utilizan el componente reutilizable `QuantityControl.jsx`.

La búsqueda y el filtrado utilizan `useProductFilters`, compartido con Inventario. Los filtros generan una lista de resultados sin modificar los productos originales.

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

La pantalla está dividida en componentes reutilizables:

- `InventoryTable.jsx`: listado para escritorio.
- `InventoryCards.jsx`: tarjetas para móviles y tablets.
- `InventoryShared.jsx`: estados, controles de stock y enlaces al detalle.

Ambas representaciones reciben los mismos productos filtrados y utilizan las operaciones del contexto global.

### 5. Registro de productos

Desde Inventario se puede acceder al formulario Agregar producto.

El formulario permite registrar:

- Nombre.
- Marca.
- Tipo.
- Categoría.
- Precio.
- Stock inicial.

El registro incorpora las siguientes validaciones:

- Todos los campos son obligatorios.
- Los campos de texto deben contener caracteres válidos.
- El nombre admite hasta 120 caracteres.
- La marca y el tipo admiten hasta 80 caracteres cada uno.
- El precio debe ser un número entero igual o mayor que cero.
- El stock inicial debe ser un número entero no negativo.
- No se permite repetir la combinación de nombre y marca de un producto existente.
- El identificador del producto se genera automáticamente.

Las reglas del formulario se centralizan en `services/productValidation.js`, utilizando expresiones regulares y comprobaciones numéricas.

El contexto utiliza las mismas reglas antes de incorporar un producto al inventario.

La función `addProduct` comunica al formulario el resultado de la validación previa. Si los datos no son válidos o el producto está duplicado, se muestra un mensaje de error y se permanece en el formulario.

Cuando la solicitud es válida, se envía al reducer y se navega a Inventario, donde el producto queda disponible.

### 6. Centro de ayuda

La página de preguntas frecuentes contiene 22 preguntas distribuidas en cuatro categorías:

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

Las operaciones de stock y carrito se realizan mediante acciones del reducer, evitando que las páginas mantengan copias independientes del inventario.

### Componentes reutilizables

El proyecto incluye componentes compartidos para evitar la duplicación de código.

**Navbar.jsx**

Administra la navegación inferior de la aplicación.

**QuantityControl.jsx**

Implementa controles de cantidad reutilizables en Inicio y Carrito.

Recibe mediante props:

- Nombre del producto.
- Cantidad seleccionada.
- Stock disponible.
- Función para aumentar la cantidad.
- Función para disminuir la cantidad.
- Variante visual del control.

Las variantes `catalog` y `cart` permiten reutilizar el comportamiento manteniendo las dimensiones de cada pantalla.

**FilterBar.jsx**

Contiene el buscador y el selector de categoría utilizados en Inicio e Inventario.

Recibe los valores, las categorías y las funciones de actualización mediante props.

**InventoryTable.jsx**

Presenta los productos del inventario en una tabla semántica para pantallas amplias.

**InventoryCards.jsx**

Presenta los mismos productos en tarjetas adaptadas a pantallas pequeñas.

**InventoryShared.jsx**

Agrupa los elementos compartidos por ambas vistas:

- `InventoryStatus`: indicador de disponibilidad.
- `InventoryStockControls`: controles para modificar existencias.
- `InventoryDetailLink`: enlace al detalle del producto.

### Hook de filtrado compartido

`hooks/useProductFilters.js` administra:

- Texto de búsqueda.
- Categoría seleccionada.
- Categorías derivadas de los productos registrados.
- Lista de productos filtrados.

Utiliza `useState` para los controles y `useMemo` para los datos derivados.

La búsqueda contempla nombre, marca, tipo y categoría. El filtro por categoría puede combinarse con la búsqueda de texto.

El filtrado utiliza `Array.filter()` y no modifica el inventario original.

### Validaciones compartidas

`services/productValidation.js` centraliza las reglas utilizadas durante el registro.

Incluye funciones para:

- Normalizar los campos de texto.
- Comprobar los formatos mediante expresiones regulares.
- Validar precios y existencias como números enteros no negativos.
- Detectar productos duplicados por nombre y marca.
- Validar un producto antes de incorporarlo al estado global.

El formulario utiliza `validateProductForm` y el contexto utiliza `validateProductRegistration`.

La validación de los datos almacenados permanece en `inventarioStorage.js`, conservando la recuperación de productos anteriores.

### Formato monetario centralizado

`utils/formatCurrency.js` contiene la función `formatCurrency()`.

Utiliza `Intl.NumberFormat` con la configuración regional `es-CL` y la moneda `CLP`.

Esta utilidad se comparte entre:

- Inicio.
- Carrito.
- Inventario.
- Detalle del producto.

Así se mantiene un formato de precios consistente y se evita repetir la configuración monetaria.

### Navegación y carga diferida

React Router DOM administra las rutas mediante `HashRouter`.

Las páginas se importan con `React.lazy()` y se muestran dentro de un componente `Suspense`.

Esto permite que Vite genere módulos separados que se cargan cuando el usuario navega a la página correspondiente.

Mientras una página se carga, se presenta el mensaje:

`Cargando contenido...`

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
│   │   ├── FilterBar.jsx
│   │   ├── InventoryCards.jsx
│   │   ├── InventoryShared.jsx
│   │   ├── InventoryTable.jsx
│   │   ├── Navbar.jsx
│   │   └── QuantityControl.jsx
│   │
│   ├── context/
│   │   └── InventarioContext.jsx
│   │
│   ├── data/
│   │   └── initialProducts.js
│   │
│   ├── hooks/
│   │   └── useProductFilters.js
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
│   │   ├── inventarioStorage.js
│   │   └── productValidation.js
│   │
│   ├── utils/
│   │   └── formatCurrency.js
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
- `hooks/`: lógica reutilizable de React.
- `pages/`: páginas y estilos específicos.
- `services/`: almacenamiento y validación de datos.
- `utils/`: funciones auxiliares compartidas.
- `App.jsx`: rutas y carga diferida de páginas.
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

Vite genera los archivos optimizados en `dist/`.

Debido a la carga diferida, la compilación genera archivos JavaScript y CSS separados para distintas páginas.

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
- Combinación de búsqueda y categoría mediante el hook compartido.
- Filtrado sin modificación de los productos originales.
- Navegación entre páginas.
- Carga diferida de páginas con React.lazy y Suspense.
- Acceso al detalle de productos.
- Navegación de regreso según el origen.
- Registro y validación de productos nuevos.
- Detección de duplicados por nombre y marca.
- Rechazo de precios y existencias inválidos.
- Comunicación de errores del registro al formulario.
- Registro de productos con precio y stock iguales a cero.
- Incremento y reducción de existencias.
- Control de productos agotados.
- Visualización del inventario en tabla y tarjetas.
- Reutilización de QuantityControl en Inicio y Carrito.
- Operaciones del carrito.
- Cálculo de subtotales y total.
- Formato CLP consistente entre páginas.
- Confirmación de compra simulada.
- Restauración del inventario.
- Persistencia mediante localStorage.
- Funcionamiento de las preguntas frecuentes.
- Adaptación a diferentes tamaños de pantalla.
- Publicación de las versiones semanales en GitHub Pages.

También se verificó la generación de la versión de producción mediante:

```bash
npm run build
```

La compilación se completó correctamente con Vite durante las pruebas locales.

---

## Publicación en GitHub Pages

El repositorio utiliza la rama `gh-pages` como origen de publicación.

Cada semana mantiene sus archivos compilados en una carpeta independiente:

```text
gh-pages/
├── index.html
├── semana-01/
├── semana-02/
└── semana-03/
```

Direcciones de las aplicaciones:

- Semana 1: https://pedrobreit.github.io/DUOC-DFII003/semana-01/
- Semana 2: https://pedrobreit.github.io/DUOC-DFII003/semana-02/
- Semana 3: https://pedrobreit.github.io/DUOC-DFII003/semana-03/

La aplicación de Semana 3 utiliza la ruta base de Vite:

`/DUOC-DFII003/semana-03/`

La navegación interna utiliza `HashRouter` para funcionar dentro de la ruta publicada.

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
