
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

export default function Carrito() {
  const {
    cartProducts,
    cartCount,
    cartTotal,
    products,
    addToCart,
    removeFromCart,
    clearCart,
    checkout
  } = useInventario();

  const [message, setMessage] = useState('');

  function handleCheckout() {
    if (cartCount === 0) return;

    const confirmed = window.confirm(
      `¿Confirmar la compra de ${cartCount} unidad(es) por ${CLP.format(cartTotal)}?`
    );

    if (confirmed) {
      checkout();
      setMessage(
        '¡Compra realizada correctamente! El inventario ha sido actualizado.'
      );
    }
  }

  function handleClearCart() {
    if (cartCount === 0) return;

    const confirmed = window.confirm(
      '¿Vaciar el carrito y devolver las unidades al inventario?'
    );

    if (confirmed) {
      clearCart();
      setMessage('Carrito vaciado correctamente.');
    }
  }

  function handleRemoveItem(item) {
    removeFromCart(item.id, item.quantity);
    setMessage('');
  }

  function handleAdd(item) {
    addToCart(item.id);
    setMessage('');
  }

  function handleSubtract(item) {
    removeFromCart(item.id);
    setMessage('');
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">
            SUPERMARKET
          </span>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-800">
            Carrito de compras
          </h1>

          <p className="mt-2 text-slate-500">
            Administra tus artículos y cantidades.
          </p>
        </div>

        <Link
          to="/"
          className="secondary-button"
        >
          ← Seguir comprando
        </Link>
      </div>

      {message && (
        <div
          role="status"
          className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800"
        >
          {message}
        </div>
      )}

      {cartProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div
            className="text-6xl"
            aria-hidden="true"
          >
            🛒
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Tu carrito está vacío
          </h2>

          <p className="my-4 text-slate-500">
            Selecciona productos del catálogo para comenzar.
          </p>

          <Link
            to="/"
            className="primary-button"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartProducts.map((item) => {
              const product = products.find(
                (p) => String(p.id) === String(item.id)
              );

              const available = product?.stock || 0;
              const isOutOfStock = available === 0;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                        {item.categoria}
                      </span>

                      <h2 className="mt-2 text-lg font-bold text-slate-800">
                        <Link
                          to={`/producto/${item.id}`}
                          state={{ from: '/carrito' }}
                          className="hover:text-blue-600"
                        >
                          {item.nombre}
                        </Link>
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.marca} · {item.tipo}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Stock restante: {available}
                      </p>

                      <strong className="mt-3 block text-lg text-blue-600">
                        {CLP.format(item.precio)}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item)}
                      aria-label={`Eliminar ${item.nombre} del carrito`}
                      className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                    <div
                      className="flex h-12 w-44 items-stretch overflow-hidden rounded-xl border border-blue-600"
                      role="group"
                      aria-label={`Cantidad de ${item.nombre}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSubtract(item)}
                        aria-label={
                          item.quantity === 1
                            ? `Eliminar ${item.nombre} del carrito`
                            : `Disminuir cantidad de ${item.nombre}`
                        }
                        title={
                          item.quantity === 1
                            ? 'Eliminar del carrito'
                            : 'Disminuir cantidad'
                        }
                        className="flex h-full w-12 shrink-0 items-center justify-center bg-blue-600 text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
                      >
                        {item.quantity === 1 ? (
                          <TrashIcon />
                        ) : (
                          <span
                            className="text-2xl"
                            aria-hidden="true"
                          >
                            −
                          </span>
                        )}
                      </button>

                      <span
                        className="flex flex-1 items-center justify-center bg-white text-lg font-extrabold text-blue-600"
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        disabled={isOutOfStock}
                        aria-label={`Aumentar cantidad de ${item.nombre}`}
                        title={
                          isOutOfStock
                            ? 'Sin stock disponible'
                            : 'Agregar una unidad'
                        }
                        className="flex h-full w-12 shrink-0 items-center justify-center bg-blue-600 text-2xl text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="block text-xs text-slate-500">
                        Subtotal
                      </span>

                      <strong className="text-xl text-slate-800">
                        {CLP.format(
                          item.precio * item.quantity
                        )}
                      </strong>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="eyebrow">
              RESUMEN DE COMPRA
            </span>

            <h2 className="mt-2 text-2xl font-bold">
              Tu pedido
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">
                  Productos diferentes
                </span>
                <strong>{cartProducts.length}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Unidades
                </span>
                <strong>{cartCount}</strong>
              </div>

              <div className="flex justify-between gap-3 border-t border-slate-200 pt-5">
                <span className="font-bold">
                  Total
                </span>

                <strong className="text-2xl text-blue-600">
                  {CLP.format(cartTotal)}
                </strong>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition-colors hover:bg-blue-700"
            >
              Confirmar compra
            </button>

            <button
              type="button"
              onClick={handleClearCart}
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Vaciar carrito
            </button>

            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Las unidades agregadas al carrito se descuentan
              inmediatamente del inventario. Al eliminarlas,
              se devuelven al stock disponible.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
