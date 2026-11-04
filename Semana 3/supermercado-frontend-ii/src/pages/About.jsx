import React from 'react';

function About() {
  return (
    <section className="content-page">
      <span className="eyebrow">SUPERMARKET</span>
      <h1>Quiénes somos</h1>
      <p className="lead">
        En SuperMarket trabajamos para ofrecer
        una experiencia de compra simple,
        cercana y confiable.
      </p>

      <div className="info-grid">
        <article className="info-card">
          <span className="info-symbol">◎</span>
          <h2>Misión</h2>
          <p>
            Ofrecer productos de calidad con
            un servicio ágil y eficiente.
          </p>
        </article>

        <article className="info-card">
          <span className="info-symbol">☆</span>
          <h2>Visión</h2>
          <p>
            Ser un supermercado reconocido
            por su confianza e innovación.
          </p>
        </article>

        <article className="info-card">
          <span className="info-symbol">♡</span>
          <h2>Valores</h2>
          <p>
            Calidad, responsabilidad,
            cercanía y compromiso.
          </p>
        </article>
      </div>
    </section>
  );
}


export default About;
