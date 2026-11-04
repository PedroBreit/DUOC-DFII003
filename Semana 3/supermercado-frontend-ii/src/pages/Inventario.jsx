
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import './Inventario.css';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

const stockStyles = {
  available: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  low: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  empty: {
    backgroundColor: '#ffe4e6',
    color: '#be123c'
  }
};

function getStockStatus(stock) {
  if (stock === 0) {
    return { label: 'Sin stock', style: stockStyles.empty };
  }

  if (stock < 10) {
    return { label: 'Stock bajo', style: stockStyles.low };
  }

  return { label: 'Disponible', style: stockStyles.available };
}

function StockControls({ product, changeStock }) {
  return (
    <div
      className="quantity inventory-quantity"
      role="group"
      aria-label={`Existencias de ${product.nombre}`}
    >
      <button
        type="button"
        disabled={product.stock === 0}
        onClick={() => changeStock(product.id, -1)}
        aria-label={`Reducir stock de ${product.nombre}`}
      >
        −
      </button>

      <strong aria-live="polite">
        {product.stock}
      </strong>

      <button
        type="button"
        onClick={() => changeStock(product.id, 1)}
        aria-label={`Aumentar stock de ${product.nombre}`}
      >
        +
      </button>
    </div>
  );
}

function DetailLink({ product }) {
  return (
    <Link
      to={`/producto/${product.id}`}
      state={{ from: '/inventario' }}
      className="inventory-detail-button"
    >
      Ver detalle
    </Link>
  );
}

export default function Inventario() {
  const {
    products,
    notice,
    changeStock,
    reset
  } = useInventario();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.categoria))],
    [products]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('es');

    return products.filter((product) => {
      const matchesCategory =
        category === 'Todas' ||
        product.categoria === category;

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

  const lowStock = products.filter(
    (p) => p.stock > 0 && p.stock < 10
  ).length;

  const outOfStock = products.filter(
    (p) => p.stock === 0
  ).length;

  function handleReset() {
    if (
      window.confirm(
        '¿Restaurar el inventario inicial y vaciar el carrito?'
      )
    ) {
      reset();
    }
  }

  return (
    <div className="inventory-page">
      {/* TÍTULO */}
      <section className="inventory-title-row">
        <h1>Inventario</h1>

        <Link
          to="/agregar-producto"
          className="inventory-add-button"
          title="Agregar producto"
          aria-label="Agregar nuevo producto"
        >
          <span aria-hidden="true">+</span>
        </Link>
      </section>

      {/* RESUMEN */}
      <section
        className="stats inventory-stats"
        aria-label="Resumen del inventario"
      >
        <div className="stat">
          <div className="stat-icon" aria-hidden="true">
            ▦
          </div>
          <span>Productos registrados</span>
          <strong>{products.length}</strong>
        </div>

        <div className="stat">
          <div
            className="stat-icon warning"
            aria-hidden="true"
          >
            !
          </div>
          <span>Stock bajo</span>
          <strong>{lowStock}</strong>
        </div>

        <div className="stat">
          <div className="stat-icon" aria-hidden="true">
            ◫
          </div>
          <span>Productos agotados</span>
          <strong>{outOfStock}</strong>
        </div>
      </section>

      {/* PANEL PRINCIPAL */}
      <section className="panel inventory-panel">
        <div className="panel-header inventory-panel-header">
          <div>
            <span className="eyebrow">
              CONTROL DE EXISTENCIAS
            </span>

            <h2>Productos registrados</h2>

            <p className="inventory-results">
              Mostrando {filtered.length} de {products.length} productos
            </p>
          </div>

          <button
            type="button"
            className="secondary-button inventory-reset-button"
            onClick={handleReset}
          >
            Restaurar inventario
          </button>
        </div>

        {/* FILTROS */}
        <div className="filters inventory-filters">
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

        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}

        {/* TABLA: SOLO ESCRITORIO AMPLIO */}
        <div className="inventory-desktop">
          <div className="inventory-table-scroll">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Unidades</th>
                  <th scope="col">Detalle</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((product) => {
                  const status = getStockStatus(product.stock);

                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="inventory-product-info">
                          <Link
                            to={`/producto/${product.id}`}
                            state={{ from: '/inventario' }}
                            className="inventory-product-link"
                          >
                            {product.nombre}
                          </Link>

                          <span className="inventory-product-brand">
                            {product.marca}
                          </span>
                        </div>
                      </td>

                      <td>{product.categoria}</td>

                      <td className="inventory-price">
                        {CLP.format(product.precio)}
                      </td>

                      <td>
                        <span
                          className="inventory-status"
                          style={status.style}
                        >
                          {status.label}
                        </span>
                      </td>

                      <td>
                        <StockControls
                          product={product}
                          changeStock={changeStock}
                        />
                      </td>

                      <td>
                        <DetailLink product={product} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* TARJETAS: CELULAR Y TABLET */}
        <div className="inventory-mobile">
          {filtered.map((product) => {
            const status = getStockStatus(product.stock);

            return (
              <article
                key={product.id}
                className="inventory-product-card"
              >
                <div className="inventory-card-top">
                  <div className="inventory-card-name">
                    <Link
                      to={`/producto/${product.id}`}
                      state={{ from: '/inventario' }}
                      className="inventory-product-link"
                    >
                      {product.nombre}
                    </Link>

                    <span className="inventory-product-brand">
                      {product.marca}
                    </span>
                  </div>

                  <span
                    className="inventory-status"
                    style={status.style}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="inventory-card-details">
                  <div className="inventory-card-row">
                    <span>Categoría</span>
                    <strong>{product.categoria}</strong>
                  </div>

                  <div className="inventory-card-row">
                    <span>Precio</span>
                    <strong className="inventory-price">
                      {CLP.format(product.precio)}
                    </strong>
                  </div>

                  <div className="inventory-card-row inventory-card-stock">
                    <span>Unidades</span>

                    <StockControls
                      product={product}
                      changeStock={changeStock}
                    />
                  </div>
                </div>

                <DetailLink product={product} />
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="empty" role="status">
            No se encontraron productos con los filtros seleccionados.
          </p>
        )}
      </section>
    </div>
  );
}
