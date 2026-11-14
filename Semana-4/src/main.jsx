
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

async function iniciarAplicacion() {
  if (import.meta.env.DEV || import.meta.env.PROD) {
    const { worker } = await import('./mocks/browser.js');

    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

iniciarAplicacion().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
});
