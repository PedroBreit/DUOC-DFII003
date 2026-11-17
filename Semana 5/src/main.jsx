import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';

import App from './App.jsx';
import { apolloClient } from './services/apolloClient.js';
import './index.css';

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
  console.error('Error al iniciar la aplicación:', error);
});
