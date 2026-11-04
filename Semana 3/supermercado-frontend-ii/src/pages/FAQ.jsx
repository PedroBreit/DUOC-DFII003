
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

const secciones = [
  {
    id: 'catalogo',
    titulo: 'Catálogo y productos',
    icono: 'catalogo',
    preguntas: [
      {
        id: 'buscar-productos',
        pregunta: '¿Cómo puedo buscar un producto?',
        respuesta:
          'En Inicio puedes utilizar el buscador para encontrar productos por nombre, marca, tipo o categoría. La lista se actualiza automáticamente mientras escribes.'
      },
      {
        id: 'filtrar-productos',
        pregunta: '¿Cómo filtro los productos por categoría?',
        respuesta:
          'En Inicio o Inventario selecciona una categoría en el filtro correspondiente. Para volver a ver todos los productos, selecciona Todas las categorías.'
      },
      {
        id: 'detalle-producto',
        pregunta: '¿Cómo puedo consultar los detalles de un producto?',
        respuesta:
          'En Inicio o Inventario selecciona Ver detalle. También puedes abrir el detalle pulsando el nombre de un artículo en Inventario o en el carrito. Allí encontrarás su nombre, marca, tipo, categoría, precio y stock disponible.'
      },
      {
        id: 'volver-detalle',
        pregunta: '¿Cómo regreso desde el detalle de un producto?',
        respuesta:
          'El botón de regreso se adapta a la pantalla desde la que ingresaste. Desde Inicio regresarás al Inicio, desde Inventario volverás al Inventario y desde Carrito volverás al Carrito. Si abres directamente la dirección de un producto, regresarás al Inicio.'
      }
    ]
  },
  {
    id: 'carrito',
    titulo: 'Carrito de compras',
    icono: 'carrito',
    preguntas: [
      {
        id: 'agregar-carrito',
        pregunta: '¿Cómo agrego productos al carrito?',
        respuesta:
          'En Inicio selecciona Agregar al carrito en la tarjeta del producto. También puedes entrar a Ver detalle, indicar la cantidad y pulsar Agregar al carrito. No es posible agregar más unidades que las disponibles.'
      },
      {
        id: 'cambiar-cantidad',
        pregunta: '¿Cómo modifico la cantidad de un producto?',
        respuesta:
          'Después de agregar un producto, aparecen controles azules con los botones − y + alrededor de la cantidad. El botón + suma una unidad y el botón − resta una. Cuando queda una sola unidad, aparece un icono de basurero para retirarla.'
      },
      {
        id: 'eliminar-carrito',
        pregunta: '¿Cómo elimino un producto del carrito?',
        respuesta:
          'Abre Carrito desde el menú principal y selecciona el botón rojo Eliminar del artículo. También puedes reducir su cantidad hasta quitar la última unidad. Las unidades eliminadas se devuelven automáticamente al stock disponible.'
      },
      {
        id: 'vaciar-carrito',
        pregunta: '¿Cómo vacío todo el carrito?',
        respuesta:
          'En Carrito selecciona Vaciar carrito y confirma la operación. Se eliminarán todos los artículos del carrito y sus cantidades se devolverán al inventario. Si cancelas la confirmación, no se realizará ningún cambio.'
      },
      {
        id: 'confirmar-compra',
        pregunta: '¿Cómo confirmo una compra?',
        respuesta:
          'Abre Carrito, revisa los productos, sus subtotales y el total del pedido. Presiona Confirmar compra y acepta el mensaje de confirmación. El carrito quedará vacío y las unidades compradas permanecerán descontadas del inventario.'
      },
      {
        id: 'descuento-stock',
        pregunta: '¿Cuándo se descuentan las unidades del inventario?',
        respuesta:
          'Las unidades se descuentan del stock disponible inmediatamente cuando se agregan al carrito. Si reduces cantidades, eliminas un artículo o vacías el carrito, se devuelven las unidades correspondientes. Al confirmar una compra no se vuelven a descontar, porque ya estaban reservadas.'
      },
      {
        id: 'carrito-vacio',
        pregunta: '¿Qué hago si mi carrito está vacío?',
        respuesta:
          'En la pantalla Carrito encontrarás el botón Explorar productos. Al seleccionarlo regresarás al Inicio, donde podrás elegir nuevos productos.'
      }
    ]
  },
  {
    id: 'inventario',
    titulo: 'Inventario y existencias',
    icono: 'inventario',
    preguntas: [
      {
        id: 'consultar-inventario',
        pregunta: '¿Dónde puedo consultar el inventario?',
        respuesta:
          'Selecciona Inventario en el menú principal. Allí encontrarás los productos registrados, sus precios, categorías, estados de disponibilidad, cantidades, filtros y accesos a sus detalles.'
      },
      {
        id: 'estados-stock',
        pregunta: '¿Qué significan los colores del estado de stock?',
        respuesta:
          'Disponible aparece en verde cuando hay 10 o más unidades. Stock bajo aparece en amarillo cuando quedan entre 1 y 9 unidades. Sin stock aparece con fondo rosa y letras rojas cuando quedan 0 unidades.'
      },
      {
        id: 'modificar-stock',
        pregunta: '¿Cómo puedo modificar las existencias?',
        respuesta:
          'En Inventario utiliza los controles + y − que aparecen junto a cada producto. El botón + incrementa el stock y el botón − lo disminuye. El sistema no permite que la cantidad sea negativa.'
      },
      {
        id: 'producto-agotado',
        pregunta: '¿Puedo comprar un producto sin stock?',
        respuesta:
          'No. Cuando el stock disponible llega a cero, el producto aparece agotado y no es posible agregar nuevas unidades al carrito. Si ya tenías unidades reservadas, estas permanecen en tu carrito hasta que las elimines o confirmes la compra.'
      },
      {
        id: 'agregar-producto',
        pregunta: '¿Cómo registro un producto nuevo?',
        respuesta:
          'Ingresa a Inventario y selecciona el botón circular + junto al título. Completa el formulario con nombre, marca, tipo, categoría, precio y stock inicial. Luego pulsa Guardar producto.'
      },
      {
        id: 'validaciones-producto',
        pregunta: '¿Qué requisitos debe cumplir un producto nuevo?',
        respuesta:
          'Los datos obligatorios deben estar completos. El precio debe ser válido y positivo; el stock inicial debe ser un número entero no negativo. Además, no se permite registrar un producto duplicado con el mismo nombre y marca.'
      },
      {
        id: 'restaurar-inventario',
        pregunta: '¿Qué ocurre si restauro el inventario?',
        respuesta:
          'En Inventario, el botón Restaurar inventario permite recuperar los productos y las cantidades iniciales tras aceptar una confirmación. Esta acción también vacía el carrito y reemplaza los cambios locales realizados, incluidos los productos agregados posteriormente.'
      }
    ]
  },
  {
    id: 'informacion',
    titulo: 'Datos y funcionamiento',
    icono: 'informacion',
    preguntas: [
      {
        id: 'persistencia',
        pregunta: '¿Se guardan los productos y el carrito?',
        respuesta:
          'Sí. Los productos, las existencias y el contenido del carrito se almacenan mediante localStorage en el navegador. Los datos permanecen disponibles al recargar la página en ese mismo navegador, mientras no se borre su almacenamiento local.'
      },
      {
        id: 'dispositivos',
        pregunta: '¿Mis datos se sincronizan entre dispositivos?',
        respuesta:
          'No. Esta versión de SuperMarket utiliza almacenamiento local del navegador y no una base de datos remota. Por ello, los cambios realizados en un dispositivo o navegador no se sincronizan automáticamente con otros.'
      },
      {
        id: 'pago-real',
        pregunta: '¿Se realizan pagos reales al confirmar una compra?',
        respuesta:
          'No. La confirmación de compra es una simulación dentro de la aplicación. Actualiza el carrito y las existencias locales, pero no procesa pagos, genera pedidos externos ni solicita datos bancarios.'
      },
      {
        id: 'contacto',
        pregunta: '¿Dónde puedo encontrar el formulario de contacto?',
        respuesta:
          'Selecciona Contacto en el menú principal. Allí podrás completar el formulario disponible en la aplicación.'
      }
    ]
  }
];

function IconoCategoria({ tipo }) {
  const trazos = {
    catalogo: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    carrito: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
      </>
    ),
    inventario: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M3 11h18M8 7V3h8v4M9 15h6" />
      </>
    ),
    informacion: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </>
    )
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {trazos[tipo]}
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`sm-help-chevron ${open ? 'is-open' : ''}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PlusIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      {!open && <path d="M12 5v14" />}
    </svg>
  );
}

export default function FAQ() {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  function toggleCategoria(id) {
    setCategoriaAbierta((actual) =>
      actual === id ? null : id
    );

    setPreguntaAbierta(null);
  }

  function togglePregunta(id) {
    setPreguntaAbierta((actual) =>
      actual === id ? null : id
    );
  }

  return (
    <section className="content-page sm-help">
      {/* ENCABEZADO SIN CONTADOR */}
      <header className="sm-help-heading">
        <span className="eyebrow">
          CENTRO DE AYUDA
        </span>

        <h1>Preguntas frecuentes</h1>

        <p className="lead">
          Todo lo que necesitas saber para utilizar
          el catálogo, carrito e inventario de SuperMarket.
        </p>
      </header>

      {/* CATEGORÍAS DESPLEGABLES */}
      <div className="sm-help-categories">
        {secciones.map((seccion) => {
          const isCategoryOpen =
            categoriaAbierta === seccion.id;

          return (
            <section
              key={seccion.id}
              className={`sm-help-category ${
                isCategoryOpen ? 'is-open' : ''
              }`}
              aria-labelledby={`categoria-label-${seccion.id}`}
            >
              <h2 className="sm-help-category-title">
                <button
                  type="button"
                  className="sm-help-category-button"
                  onClick={() => toggleCategoria(seccion.id)}
                  aria-expanded={isCategoryOpen}
                  aria-controls={`categoria-panel-${seccion.id}`}
                  id={`categoria-label-${seccion.id}`}
                >
                  <span className="sm-help-category-leading">
                    <span className="sm-help-category-icon">
                      <IconoCategoria tipo={seccion.icono} />
                    </span>

                    <span className="sm-help-category-text">
                      <strong>{seccion.titulo}</strong>

                      <small>
                        {seccion.preguntas.length} preguntas
                      </small>
                    </span>
                  </span>

                  <span className="sm-help-category-chevron">
                    <ChevronIcon open={isCategoryOpen} />
                  </span>
                </button>
              </h2>

              {isCategoryOpen && (
                <div
                  id={`categoria-panel-${seccion.id}`}
                  className="sm-help-category-panel"
                >
                  <div className="sm-help-questions">
                    {seccion.preguntas.map((item) => {
                      const isQuestionOpen =
                        preguntaAbierta === item.id;

                      return (
                        <article
                          className={`sm-help-question ${
                            isQuestionOpen ? 'is-open' : ''
                          }`}
                          key={item.id}
                        >
                          <h3 className="sm-help-question-title">
                            <button
                              type="button"
                              className="sm-help-question-button"
                              aria-expanded={isQuestionOpen}
                              aria-controls={`respuesta-${item.id}`}
                              onClick={() =>
                                togglePregunta(item.id)
                              }
                            >
                              <span>{item.pregunta}</span>

                              <span className="sm-help-question-icon">
                                <PlusIcon open={isQuestionOpen} />
                              </span>
                            </button>
                          </h3>

                          {isQuestionOpen && (
                            <div
                              id={`respuesta-${item.id}`}
                              className="sm-help-answer"
                            >
                              <p>{item.respuesta}</p>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* AYUDA ADICIONAL */}
      <section className="sm-help-footer">
        <div className="sm-help-footer-icon" aria-hidden="true">
          ?
        </div>

        <div className="sm-help-footer-content">
          <h2>¿Necesitas más ayuda?</h2>

          <p>
            Puedes explorar los productos disponibles
            o acceder a nuestra página de contacto.
          </p>

          <div className="sm-help-actions">
            <Link
              to="/"
              className="sm-help-primary-link"
            >
              Explorar productos
            </Link>

            <Link
              to="/contactanos"
              className="sm-help-secondary-link"
            >
              Ir a Contacto
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
