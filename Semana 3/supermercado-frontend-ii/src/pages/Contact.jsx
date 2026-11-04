import React, { useState } from 'react';

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="content-page">
      <span className="eyebrow">CONTACTO</span>
      <h1>Contáctanos</h1>
      <p className="lead">
        ¿Necesitas ayuda? Completa el formulario
        para preparar tu consulta.
      </p>

      <div className="contact-grid">
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <label>
            Nombre
            <input
              name="nombre"
              placeholder="Tu nombre"
              required
              onChange={() => setSent(false)}
            />
          </label>

          <label>
            Correo electrónico
            <input
              name="correo"
              type="email"
              placeholder="correo@ejemplo.cl"
              required
              onChange={() => setSent(false)}
            />
          </label>

          <label>
            Mensaje
            <textarea
              name="mensaje"
              rows="5"
              placeholder="Escribe tu mensaje..."
              required
              onChange={() => setSent(false)}
            />
          </label>

          <button className="primary-button" type="submit">
            Validar mensaje
          </button>

          {sent && (
            <p className="notice" role="status">
              Formulario validado. No se ha enviado
              el mensaje.
            </p>
          )}
        </form>

        <aside className="contact-aside">
          <h2>Atención al cliente</h2>
          <p>
            Estamos para ayudarte con tus consultas.
          </p>

          <div className="aside-highlight">
            <span>Horario de atención</span>
            <strong>
              Lunes a sábado
              <br />
              09:00 a 19:00
            </strong>
          </div>
        </aside>
      </div>
    </section>
  );
}


export default Contact;
