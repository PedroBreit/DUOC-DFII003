
import { useState } from 'react';

const preguntas = [
  {
    id: 'buscar-productos',
    pregunta: '¿Cómo busco un producto?',
    respuesta:
      'En Inicio puedes buscar productos por nombre, marca o tipo. También puedes utilizar el buscador de Inventario para localizar artículos.'
  },
  {
    id: 'filtrar-productos',
    pregunta: '¿Cómo filtro los productos?',
    respuesta:
      'Selecciona una categoría en el filtro de Inicio o Inventario. Puedes volver a mostrar todos los productos eligiendo Todas las categorías.'
  },
  {
    id: 'agregar-carrito',
    pregunta: '¿Cómo agrego productos al carrito?',
    respuesta:
      'En Inicio, utiliza el botón + del producto para seleccionar unidades. El botón − permite reducir la cantidad. La selección comienza en cero y no puede superar el stock disponible.'
  },
  {
    id: 'confirmar-compra',
    pregunta: '¿Cómo realizo una compra?',
    respuesta:
      'Selecciona los productos que deseas comprar, revisa el total del carrito y presiona Comprar. Confirma la operación para descontar las unidades del inventario.'
  },
  {
    id: 'cancelar-compra',
    pregunta: '¿Puedo cancelar una compra antes de confirmarla?',
    respuesta:
      'Sí. Puedes reducir las cantidades o utilizar Vaciar carrito. También puedes cancelar el mensaje de confirmación sin modificar las existencias.'
  },
  {
    id: 'consultar-inventario',
    pregunta: '¿Dónde puedo consultar el inventario?',
    respuesta:
      'Selecciona Inventario en el menú principal. Allí encontrarás la tabla de productos, el buscador, los filtros y los indicadores de existencias.'
  },
  {
    id: 'modificar-stock',
    pregunta: '¿Cómo actualizo las existencias?',
    respuesta:
      'En Inventario utiliza los botones + y − de cada producto para aumentar o disminuir sus unidades. El stock nunca puede ser negativo.'
  },
  {
    id: 'agregar-producto',
    pregunta: '¿Cómo registro un producto nuevo?',
    respuesta:
      'Entra a Inventario y presiona el botón circular + junto al título. Completa el formulario con nombre, marca, tipo, categoría, precio y stock inicial, y luego selecciona Guardar producto.'
  },
  {
    id: 'stock-bajo',
    pregunta: '¿Qué significa stock bajo?',
    respuesta:
      'Significa que quedan entre 1 y 9 unidades de un producto. Cuando las existencias llegan a cero, el producto aparece como agotado.'
  },
  {
    id: 'guardar-cambios',
    pregunta: '¿Los cambios quedan guardados?',
    respuesta:
      'Sí. Los productos y las existencias se almacenan localmente en el navegador mediante localStorage. Los datos se mantienen al recargar la página en ese mismo navegador.'
  },
  {
    id: 'restaurar-inventario',
    pregunta: '¿Cómo restauro el inventario?',
    respuesta:
      'En la página Inventario presiona Restaurar inventario y confirma la operación. Esto recuperará los productos y las cantidades iniciales, reemplazando los cambios realizados.'
  }
];

export default function FAQ() {
  const [abierta, setAbierta] = useState(null);

  function togglePregunta(id) {
    setAbierta((actual) =>
      actual === id ? null : id
    );
  }

  return (
    <section className="content-page faq-page">
      <span className="eyebrow">
        CENTRO DE AYUDA
      </span>

      <h1>Preguntas frecuentes</h1>

      <p className="lead">
        Resuelve tus dudas sobre las compras,
        los productos y el inventario.
      </p>

      <div className="faq-list">
        {preguntas.map((item) => {
          const isOpen = abierta === item.id;

          return (
            <article
              className="faq-item"
              key={item.id}
            >
              <h2>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`respuesta-${item.id}`}
                  onClick={() =>
                    togglePregunta(item.id)
                  }
                >
                  <span>
                    {item.pregunta}
                  </span>

                  <span
                    className="faq-symbol"
                    aria-hidden="true"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </h2>

              {isOpen && (
                <div
                  id={`respuesta-${item.id}`}
                  className="faq-answer"
                >
                  <p>{item.respuesta}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
