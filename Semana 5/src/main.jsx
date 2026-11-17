import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';

import App from './App.jsx';
import { apolloClient } from './services/apolloClient.js';
import './index.css';

function mostrarErrorInicio() {
  const raiz = document.getElementById('root');
  if (!raiz) return;

  const contenedor = document.createElement('main');
  contenedor.setAttribute('role', 'alert');
  contenedor.style.cssText =
    'font-family:system-ui,sans-serif;max-width:620px;margin:12vh auto;padding:32px;color:#12343c;text-align:center';

  const titulo = document.createElement('h1');
  titulo.textContent = 'No pudimos iniciar Horizonte Viajes';

  const detalle = document.createElement('p');
  detalle.textContent =
    'No fue posible activar el servicio de datos de demostracion. Verifica tu conexion y vuelve a intentarlo.';
  detalle.style.cssText = 'line-height:1.7;margin:18px 0 24px';

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.textContent = 'Reintentar';
  boton.style.cssText =
    'padding:12px 24px;border:0;border-radius:8px;background:#12343c;color:#fff;cursor:pointer';
  boton.addEventListener('click', () => window.location.reload());

  contenedor.append(titulo, detalle, boton);
  raiz.replaceChildren(contenedor);
}

async function iniciarAplicacion() {
  const { worker } = await import('./mocks/browser.js');

  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      options: {
        scope: import.meta.env.BASE_URL,
      },
    },
    onUnhandledRequest: 'bypass',
  });

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
}

iniciarAplicacion().catch((error) => {
  console.error('Error al iniciar la aplicacion:', error);
  mostrarErrorInicio();
});
