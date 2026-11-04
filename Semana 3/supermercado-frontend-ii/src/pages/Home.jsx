
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import QuantityControl from '../components/QuantityControl.jsx';
import { useInventario } from '../context/InventarioContext.jsx';
import { formatCurrency } from '../utils/formatCurrency.js';

import './Home.css';

export default function Home() {
  const {
    products,
    cartProducts,
    addToCart,
    removeFromCart
  } = useInventario();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.categoria))],
    [products]
  );

  const cartQuantities = useMemo(
    () =>
      new Map(
        cartProducts.map((item) => [
          String(item.id),
          item.quantity
        ])
      ),
    [cartProducts]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === 'Todas' ||
        product.categoria === category;

      const query = search.trim().toLocaleLowerCase('es');

      const searchable = [
        product.nombre,
        product.marca,
        product.tipo,
        product.categoria
      ]
        .join(' ')
        .toLocaleLowerCase('es');

      return matchesCategory && searchable.includes(query);
    });
  }, [products, search, category]);

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">
            SUPERMARKET
          </span>

          <h1>Catálogo de productos</h1>

          <p>
            Explora nuestro catálogo, consulta los detalles
            de cada artículo y agrega tus productos favoritos
            al carrito de compras.
          </p>
        </div>

        <div
          className="hero-art"
          aria-hidden="true"
        >
          🛒
        </div>
      </section>

      <section className="panel mt-6">
        <div className="panel-header">
          <div>
            <span className="eyebrow">
              NUESTROS PRODUCTOS
            </span>

            <h2>Productos disponibles</h2>
          </div>
        </div>

        <div className="filters">
          <label className="search-field">
            <span className="sr-only">
              Buscar producto
            </span>

            <input
              type="search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Buscar producto..."
            />
          </label>

          <label className="category-field">
            <span className="sr-only">
              Filtrar por categoría
            </span>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="Todas">
                Todas las categorías
              </option>

              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const quantity =
              cartQuantities.get(String(product.id)) || 0;

            const isOutOfStock = product.stock === 0;

            return (
              <article
                key={product.id}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {product.categoria}
                  </span>

                  <h3 className="mt-4 text-lg font-bold text-slate-800">
                    {product.nombre}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {product.marca} · {product.tipo}
                  </p>

                  <p className="mt-4 text-2xl font-extrabold text-blue-600">
                    {formatCurrency(product.precio)}
                  </p>

                  <p
                    className={`mt-3 text-sm font-semibold ${
                      isOutOfStock
                        ? 'text-red-600'
                        : product.stock < 10
                          ? 'text-amber-600'
                          : 'text-green-700'
                    }`}
                  >
                    {isOutOfStock
                      ? 'Sin stock disponible'
                      : `${product.stock} unidades disponibles`}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        addToCart(product.id)
                      }
                      disabled={isOutOfStock}
                      className="flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      {isOutOfStock
                        ? 'Sin stock'
                        : 'Agregar al carrito'}
                    </button>
                  ) : (
                    <QuantityControl
                      productName={product.nombre}
                      quantity={quantity}
                      availableStock={product.stock}
                      onIncrease={() =>
                        addToCart(product.id)
                      }
                      onDecrease={() =>
                        removeFromCart(product.id)
                      }
                      variant="catalog"
                    />
                  )}

                  <Link
                    to={`/producto/${product.id}`}
                    state={{ from: '/' }}
                    className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-center font-bold text-slate-700 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Ver detalle
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <p
            className="empty"
            role="status"
          >
            No se encontraron productos.
          </p>
        )}
      </section>
    </>
  );
}
