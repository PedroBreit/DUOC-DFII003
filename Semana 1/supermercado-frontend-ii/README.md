# SuperMarket - Sistema de Gestión de Inventario

**Asignatura:** Desarrollo Frontend II (PFY2202)  
**Actividad:** Evaluación Formativa 1 - Semana 1  
**Institución:** Duoc UC  
**Estudiante:** Pedro Breit  
**Año:** 2026

---

## 1. Descripción del proyecto

SuperMarket es una aplicación web de gestión de inventario para un supermercado, desarrollada con React, JavaScript, HTML y CSS.

Permite consultar productos, gestionar existencias y navegar entre diferentes secciones mediante React Router, utilizando una arquitectura de aplicación de página única (SPA).

## 2. Requerimientos implementados

| N.º | Requerimiento | Implementación |
|---|---|---|
| 1 | Desarrollar un sitio web de gestión de inventario para un supermercado. | Aplicación SuperMarket con catálogo y control de existencias. |
| 2 | Utilizar HTML, JavaScript, CSS y React. | Desarrollo basado en componentes React, JSX, JavaScript y CSS. |
| 3 | Incorporar una página principal (Home). | Panel de inventario con productos, categorías, precios y cantidades disponibles. |
| 4 | Implementar un menú inferior de navegación. | Menú con enlaces a las diferentes secciones de la aplicación. |
| 5 | Desarrollar al menos dos páginas adicionales de los temas indicados. | Secciones Quiénes somos, Contáctanos y Preguntas frecuentes. |
| 6 | Implementar y configurar React Router. | Navegación entre componentes mediante rutas, sin recargas completas. |
| 7 | Gestionar el código fuente mediante Git y GitHub. | Repositorio con control de versiones y organización por semana. |

## 3. Funcionalidades

- Visualización del inventario de productos.
- Búsqueda y filtrado por categoría.
- Consulta de precios y cantidades disponibles.
- Incremento y disminución de existencias.
- Identificación de productos con stock bajo.
- Restauración de cantidades iniciales.
- Persistencia de datos mediante LocalStorage.
- Navegación entre las secciones de la aplicación.
- Formulario de contacto con validación.
- Preguntas frecuentes con respuestas desplegables.

## 4. Tecnologías utilizadas

| Tecnología | Propósito |
|---|---|
| HTML5 | Estructura del documento. |
| CSS3 | Presentación visual y diseño adaptable. |
| JavaScript | Lógica e interactividad. |
| React | Desarrollo de componentes de interfaz. |
| React Router | Navegación entre las vistas. |
| Vite | Entorno de desarrollo y compilación. |
| LocalStorage | Persistencia local del inventario. |
| Git y GitHub | Control de versiones y repositorio remoto. |
| GitHub Pages | Publicación web. |

## 5. Estructura del proyecto

```text
supermercado-frontend-ii/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx
│   ├── FAQ.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

## 6. Instalación y ejecución

**Requisitos:** Node.js y npm.

Clonar el repositorio:

```bash
git clone https://github.com/PedroBreit/DUOC-DFII003.git
```

Acceder al directorio:

```bash
cd "DUOC-DFII003/Semana 1/supermercado-frontend-ii"
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Generar la compilación de producción:

```bash
npm run build
```

## 7. Enlaces

**Repositorio:**  
https://github.com/PedroBreit/DUOC-DFII003

**Aplicación web - Semana 1:**  
https://pedrobreit.github.io/DUOC-DFII003/semana-01/

## 8. Consideraciones técnicas

El inventario utiliza datos precargados y almacena las modificaciones en LocalStorage. No dispone de integración con una base de datos.

El formulario de contacto incorpora validación de campos, sin implementar el envío de información a un servidor.

La aplicación utiliza React Router para gestionar la navegación entre las distintas vistas.

---

**Pedro Breit**  
Desarrollo Frontend II - Duoc UC
