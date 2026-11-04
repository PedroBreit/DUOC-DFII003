
import { useState } from 'react';
import {
  Link,
  useLocation,
  useParams
} from 'react-router-dom';

import { useInventario } from '../context/InventarioContext.jsx';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

const allowedOrigins = {
  '/': 'Volver al inicio',
  '/inventario': 'Volver al inventario',
  '/carrito': 'Volver al carrito'
};

export default function DetalleProducto() {
  const { id } = useParams();
  const location = useLocation();

  const {
    products,
    addToCart,
    cartProducts
  } = useInventario();

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  // Identificar desde qué pantalla llegó el usuario.
  const origin = location.state?.from;

  // Aceptar solamente las rutas conocidas.
  const backTo = Object.prototype.hasOwnProperty.call(
    allowedOrigins,
    origin
  )
    ? origin
    : '/';

  const backLabel = allowedOrigins[backTo];

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  // Producto inexistente.
  if (!product) {
    return (
      <section className="panel">
        <h1 className="text-2xl font-bold">
          Producto no encontrado
        </h1>

        <p className="my-4 text-slate-500">
          El producto solicitado no existe.
        </p>

        <Link
          to={backTo}
          className="primary-button"
        >
          ← {backLabel}
        </Link>
      </section>
    );
  }

  const inCart = cartProducts.find(
    (item) => String(item.id) === String(product.id)
  );

  function handleAdd() {
    if (
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      quantity > product.stock
    ) {
      setMessage('Cantidad no disponible.');
      return;
    }

    addToCart(product.id, quantity);

    setMessage(
      'Producto agregado correctamente al carrito.'
    );

    setQuantity(1);
  }

  return (
    <section className="mx-auto max-w-4xl">
      {/* NAVEGACIÓN DINÁMICA */}
      <Link
        to={backTo}
        className="mb-6 inline-block font-semibold text-blue-600 hover:underline"
      >
        ← {backLabel}
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50 p-6 sm:p-8">
          <span className="eyebrow">
            DETALLE DE PRODUCTO
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-800">
            {product.nombre}
          </h1>

          <p className="mt-2 text-slate-500">
            Información completa del artículo seleccionado.
          </p>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
          <div className="flex min-h-64 items-center justify-center rounded-2xl bg-blue-50">
            <div className="text-center">
              <div
                className="text-8xl"
                aria-hidden="true"
              >
                🛒
              </div>

              <p className="mt-4 font-semibold text-blue-700">
                SuperMarket
              </p>
            </div>
          </div>

          <div>
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              {product.categoria}
            </span>

            <dl className="mt-6 space-y-4">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">
                  Marca
                </dt>

                <dd className="font-semibold">
                  {product.marca}
                </dd>
              </div>

              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">
                  Tipo
                </dt>

                <dd className="font-semibold">
                  {product.tipo}
                </dd>
              </div>

              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">
                  Stock disponible
                </dt>

                <dd className="font-semibold">
                  {product.stock} unidades
                </dd>
              </div>

              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">
                  En el carrito
                </dt>

                <dd className="font-semibold">
                  {inCart?.quantity || 0} unidades
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-500">
                Precio unitario
              </p>

              <p className="mt-1 text-4xl font-extrabold text-blue-600">
                {CLP.format(product.precio)}
              </p>
            </div>

            <div className="mt-6">
              <label
                htmlFor="product-quantity"
                className="mb-2 block font-semibold"
              >
                Cantidad a agregar
              </label>

              <input
                id="product-quantity"
                type="number"
                min="1"
                max={product.stock}
                step="1"
                value={quantity}
                disabled={product.stock === 0}
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                  setMessage('');
                }}
                className="w-28 rounded-lg border border-slate-300 p-3"
              />
            </div>

            <button
              type="button"
              disabled={product.stock === 0}
              onClick={handleAdd}
              className="mt-5 w-full rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {product.stock === 0
                ? 'Producto agotado'
                : 'Agregar al carrito'}
            </button>

            {message && (
              <p
                role="status"
                className="mt-4 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-700"
              >
                {message}
              </p>
            )}

            <Link
              to="/carrito"
              className="mt-4 block text-center font-semibold text-blue-700 hover:underline"
            >
              Ir al carrito de compras
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
