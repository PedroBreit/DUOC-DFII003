
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInventario } from '../context/InventarioContext.jsx';
import './Home.css';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

export default function Home() {
  const {
    products,
    purchase,
    purchaseResult
  } = useInventario();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [cart, setCart] = useState({});
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  const pendingId = useRef(null);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.categoria))],
    [products]
  );

  const availableProducts = useMemo(() => {
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

      return (
        matchesCategory &&
        searchable.includes(query)
      );
    });
  }, [products, search, category]);

  const cartProducts = useMemo(() => {
    return products
      .map((product) => ({
        ...product,
        quantity: Math.min(
          cart[product.id] || 0,
          product.stock
        )
      }))
      .filter((product) => product.quantity > 0);
  }, [products, cart]);

  const itemCount = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const total = cartProducts.reduce(
    (sum, product) =>
      sum + product.precio * product.quantity,
    0
  );

  function changeQuantity(product, amount) {
    if (pending) {
      return;
    }

    setMessage('');

    setCart((current) => {
      const previous = Math.min(
        current[product.id] || 0,
        product.stock
      );

      const next = Math.max(
        0,
        Math.min(product.stock, previous + amount)
      );

      return {
        ...current,
        [product.id]: next
      };
    });
  }

  function clearCart() {
    if (pending) {
      return;
    }

    setCart({});
    setMessage('');
  }

  function handlePurchase() {
    if (pending || cartProducts.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `¿Confirmar la compra de ${itemCount} unidad(es) por ${CLP.format(total)}?`
    );

    if (!confirmed) {
      return;
    }

    const items = cartProducts.map((product) => ({
      id: product.id,
      quantity: product.quantity
    }));

    setMessage('');
    setPending(true);

    pendingId.current = purchase(items);
  }

  // Esperar el resultado del reducer antes de vaciar el carrito.
  useEffect(() => {
    if (
      pendingId.current === null ||
      purchaseResult?.id !== pendingId.current
    ) {
      return;
    }

    if (purchaseResult.success) {
      setCart({});
    }

    setMessage(purchaseResult.message);
    setPending(false);
    pendingId.current = null;
  }, [purchaseResult]);

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">SUPERMARKET</span>
          <h1>Catálogo de productos</h1>
          <p>
            Encuentra tus productos, selecciona las
            cantidades y completa tu compra.
          </p>
        </div>

        <div className="hero-art" aria-hidden="true">
          🛒
        </div>
      </section>

      <div className="shop-layout">
        <section
          className="panel shop-catalog"
          aria-label="Catálogo de productos"
        >
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                PRODUCTOS
              </span>
              <h2>Disponibles para comprar</h2>
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar producto..."
              />
            </label>

            <label className="category-field">
              <span className="sr-only">
                Filtrar por categoría
              </span>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Todas">
                  Todas las categorías
                </option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="shop-products">
            {availableProducts.map((product) => {
              const quantity = Math.min(
                cart[product.id] || 0,
                product.stock
              );

              return (
                <article
                  className="shop-product"
                  key={product.id}
                >
                  <div className="shop-product-info">
                    <span className="shop-category">
                      {product.categoria}
                    </span>

                    <h3>{product.nombre}</h3>

                    <p>
                      {product.marca} · {product.tipo}
                    </p>

                    <strong className="shop-price">
                      {CLP.format(product.precio)}
                    </strong>

                    <span
                      className={`shop-stock ${
                        product.stock === 0
                          ? 'shop-stock-empty'
                          : ''
                      }`}
                    >
                      {product.stock === 0
                        ? 'Agotado'
                        : `${product.stock} disponibles`}
                    </span>
                  </div>

                  <div
                    className="quantity shop-quantity"
                    aria-label={`Cantidad de ${product.nombre}`}
                  >
                    <button
                      type="button"
                      disabled={pending || quantity === 0}
                      aria-label={`Quitar una unidad de ${product.nombre}`}
                      onClick={() =>
                        changeQuantity(product, -1)
                      }
                    >
                      −
                    </button>

                    <strong>{quantity}</strong>

                    <button
                      type="button"
                      disabled={
                        pending ||
                        quantity >= product.stock
                      }
                      aria-label={`Agregar una unidad de ${product.nombre}`}
                      onClick={() =>
                        changeQuantity(product, 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {availableProducts.length === 0 && (
            <p className="empty">
              No se encontraron productos.
            </p>
          )}
        </section>

        <aside
          className="panel shop-cart"
          aria-label="Carrito de compras"
        >
          <span className="eyebrow">
            TU COMPRA
          </span>

          <h2>Carrito</h2>

          {cartProducts.length === 0 ? (
            <p className="shop-cart-empty">
              Tu carrito está vacío.
            </p>
          ) : (
            <ul className="shop-cart-items">
              {cartProducts.map((product) => (
                <li key={product.id}>
                  <div>
                    <strong>{product.nombre}</strong>
                    <span>
                      {product.quantity} ×{' '}
                      {CLP.format(product.precio)}
                    </span>
                  </div>

                  <strong>
                    {CLP.format(
                      product.precio * product.quantity
                    )}
                  </strong>
                </li>
              ))}
            </ul>
          )}

          <div className="shop-cart-summary">
            <div>
              <span>Unidades</span>
              <strong>{itemCount}</strong>
            </div>

            <div className="shop-total">
              <span>Total</span>
              <strong>{CLP.format(total)}</strong>
            </div>
          </div>

          <button
            type="button"
            className="primary-button shop-buy-button"
            disabled={pending || itemCount === 0}
            onClick={handlePurchase}
          >
            {pending ? 'Procesando...' : 'Comprar'}
          </button>

          <button
            type="button"
            className="secondary-button shop-clear-button"
            disabled={pending || itemCount === 0}
            onClick={clearCart}
          >
            Vaciar carrito
          </button>

          {message && (
            <p className="notice" role="status">
              {message}
            </p>
          )}
        </aside>
      </div>
    </>
  );
}
