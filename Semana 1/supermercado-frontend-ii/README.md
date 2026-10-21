# SuperMarket - Gestion de Inventario

Proyecto académico para **Desarrollo Frontend II (PFY2202), Semana 1, Evaluación Formativa 1, Forma B**.

## Objetivo

Desarrollar un sitio web de supermercado utilizando **React, HTML, JavaScript y CSS**, con una página de inicio y dos pantallas adicionales accesibles desde un **menú inferior** mediante **React Router**.

## Páginas y rutas

| Ruta | Componente | Descripción |
| --- | --- | --- |
| `/` | `Home` | Panel e inventario demostrativo |
| `/quienes-somos` | `About` | Información del supermercado |
| `/contactanos` | `Contact` | Formulario de contacto demostrativo |
| Cualquier otra | `NotFound` | Página no encontrada |

## Requisitos previos

- Node.js (versión compatible con Vite 6, por ejemplo Node 20.19+ o 22.12+).
- npm.

## Ejecución local

1. Abre una terminal en esta carpeta.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev`.
4. Abre la URL que muestra Vite en la terminal (usualmente `http://localhost:5173`).
5. Para verificar la compilación: `npm run build`.

## Tecnologías

- React 18.
- React Router DOM 6 (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`).
- Vite como herramienta de desarrollo (alternativa moderna a Create React App, que aparece en la guía del curso).
- CSS adaptable a móvil.

## Funcionalidad complementaria

El Home muestra datos de ejemplo, permite buscar y filtrar productos, ajustar unidades y restaurar existencias. Los cambios se guardan solo en `localStorage` del navegador. **No hay backend ni base de datos**. El formulario valida los datos, pero **no envía información a ningún servicio**.

## Publicación en GitHub

Según la actividad, el repositorio debe llamarse:

`supermercado-nombre-apellido-siglaCurso`

Reemplaza los campos por tus datos. Ejemplo ilustrativo:

`supermercado-ana-perez-pfy2202`

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Actividad formativa 1: supermercado React Router"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPOSITORIO.git
git push -u origin main
```

Crea primero un repositorio **vacío** en tu cuenta de GitHub. Reemplaza el usuario y el nombre del repositorio en la URL. Comparte con tu docente el enlace real del repositorio.

## Lista de verificación para la pauta

- [ ] Página de inicio del supermercado.
- [ ] Dos páginas adicionales: Quiénes somos y Contáctanos.
- [ ] Menú inferior visible para navegar entre las tres páginas.
- [ ] React Router instalado y configurado.
- [ ] Las rutas funcionan sin recarga completa.
- [ ] Diseño con HTML (JSX), CSS, JavaScript y React.
- [ ] Proyecto ejecuta sin errores y compila.
- [ ] Código publicado en GitHub con el nombre solicitado.
- [ ] URL del repositorio compartida con el docente.

**Nota:** La pauta tiene dos criterios, cada uno de 50 puntos. La evaluación definitiva corresponde al docente.
