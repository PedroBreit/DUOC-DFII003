
import React, { useState } from 'react';

const preguntas = [
  {
    pregunta: '¿Cómo busco un producto?',
    respuesta:
      'Ingresa el nombre del producto en el buscador del inventario.'
  },
  {
    pregunta: '¿Cómo filtro los productos?',
    respuesta:
      'Selecciona una categoría para consultar sus productos.'
  },
  {
    pregunta: '¿Cómo actualizo las existencias?',
    respuesta:
      'Utiliza los botones + y − junto a cada producto.'
  },
  {
    pregunta: '¿Qué significa stock bajo?',
    respuesta:
      'El producto tiene menos de 10 unidades disponibles.'
  },
  {
    pregunta: '¿Los cambios quedan guardados?',
    respuesta:
      'Sí, en el almacenamiento local de este navegador.'
  },
  {
    pregunta: '¿Cómo restauro el inventario?',
    respuesta:
      'Presiona Restaurar en la página de inicio.'
  }
];

export default function FAQ() {
  const [abierta, setAbierta] = useState(null);

  return (
    <section className="content-page faq-page">
      <span className="eyebrow">CENTRO DE AYUDA</span>
      <h1>Preguntas frecuentes</h1>
      <p className="lead">
        Encuentra respuestas a tus consultas.
      </p>

      <div className="faq-list">
        {preguntas.map((item, indice) => (
          <article className="faq-item" key={indice}>
            <h2>
              <button
                type="button"
                className="faq-question"
                aria-expanded={abierta === indice}
                aria-controls={`respuesta-${indice}`}
                onClick={() =>
                  setAbierta(
                    abierta === indice ? null : indice
                  )
                }
              >
                <span>{item.pregunta}</span>
                <span
                  className="faq-symbol"
                  aria-hidden="true"
                >
                  {abierta === indice ? '−' : '+'}
                </span>
              </button>
            </h2>

            {abierta === indice && (
              <div
                id={`respuesta-${indice}`}
                className="faq-answer"
              >
                <p>{item.respuesta}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
