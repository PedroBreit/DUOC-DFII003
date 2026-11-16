import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

async function iniciarAplicacion() {
  // Actividad académica: la API mock está disponible en desarrollo y preview.
  const { worker } = await import('./mocks/browser.js');
  await worker.start({ onUnhandledRequest: 'bypass' });

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

iniciarAplicacion().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
});
