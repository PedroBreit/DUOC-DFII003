import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="content-page center">
      <h1>Página no encontrada</h1>
      <p>La página solicitada no existe.</p>
      <Link className="primary-button" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}


export default NotFound;
