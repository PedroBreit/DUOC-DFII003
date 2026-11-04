
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App.jsx';
import {
  InventarioProvider
} from './context/InventarioContext.jsx';

// Framework CSS.
import './tailwind.css';

// Estilos originales de SuperMarket.
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <InventarioProvider>
        <App />
      </InventarioProvider>
    </HashRouter>
  </React.StrictMode>
);
