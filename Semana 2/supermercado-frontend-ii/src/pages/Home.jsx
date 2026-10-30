import React, { useMemo, useState } from 'react';
import { useInventario } from '../context/InventarioContext.jsx';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

function Home() {
  const { products, notice, changeStock, reset } = useInventario();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const categories = [
    ...new Set(products.map((p) => p.categoria))
  ];

  const lowStock = products.filter(
    (p) => p.stock < 10
  ).length;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        category === 'Todas' ||
        p.categoria === category;

      const matchesSearch = p.nombre
        .toLocaleLowerCase('es')
        .includes(search.toLocaleLowerCase('es'));

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">PANEL PRINCIPAL</span>
          <h1>Gestión de inventario</h1>
          <p>
            Controla tus productos y mantén tus
            existencias actualizadas.
          </p>
        </div>

        <div className="hero-art" aria-hidden="true">
          ▦
        </div>
      </section>

      <section className="stats" aria-label="Resumen">
        <div className="stat">
          <div className="stat-icon">▦</div>
          <span>Productos registrados</span>
          <strong>{products.length}</strong>
        </div>

        <div className="stat">
          <div className="stat-icon">◫</div>
          <span>Categorías</span>
          <strong>{categories.length}</strong>
        </div>

        <div className="stat">
          <div className="stat-icon warning">!</div>
          <span>Stock bajo</span>
          <strong>{lowStock}</strong>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">INVENTARIO</span>
            <h2>Productos</h2>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={reset}
          >
            Restaurar
          </button>
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
              <option value="Todas">Todas las categorías</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
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

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Unidades</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="product-name">
                    {p.nombre}
                  </td>
                  <td>{p.categoria}</td>
                  <td>{CLP.format(p.precio)}</td>
                  <td>
                    <span
                      className={`status ${
                        p.stock < 10 ? 'low' : 'ok'
                      }`}
                    >
                      {p.stock === 0
                        ? 'Sin stock'
                        : p.stock < 10
                          ? 'Stock bajo'
                          : 'Disponible'}
                    </span>
                  </td>
                  <td>
                    <div className="quantity">
                      <button
                        type="button"
                        disabled={p.stock === 0}
                        aria-label={`Reducir stock de ${p.nombre}`}
                        onClick={() => changeStock(p.id, -1)}
                      >
                        −
                      </button>
                      <strong>{p.stock}</strong>
                      <button
                        type="button"
                        aria-label={`Aumentar stock de ${p.nombre}`}
                        onClick={() => changeStock(p.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="empty">
            No se encontraron productos.
          </p>
        )}
      </section>
    </>
  );
}


export default Home;
