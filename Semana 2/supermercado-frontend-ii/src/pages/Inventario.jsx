
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

export default function Inventario() {
  const { products, notice, changeStock, reset } = useInventario();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  // Categorias disponibles.
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.categoria))],
    [products]
  );

  // Indicadores generales.
  const lowStock = products.filter(
    (p) => p.stock > 0 && p.stock < 10
  ).length;

  const outOfStock = products.filter(
    (p) => p.stock === 0
  ).length;

  // Filtrar sin modificar el inventario original.
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        category === 'Todas' ||
        p.categoria === category;

      const matchesSearch = p.nombre
        .toLocaleLowerCase('es')
        .includes(search.trim().toLocaleLowerCase('es'));

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  function handleReset() {
    if (window.confirm(
      '¿Restaurar el inventario inicial? Se perderán los cambios realizados.'
    )) {
      reset();
    }
  }

  return (
    <>
      <section className="inventory-heading">
        <div>
          <span className="eyebrow">
            ADMINISTRACIÓN
          </span>

          <h1>Inventario</h1>

          <p>
            Administra los productos y controla
            las existencias de SuperMarket.
          </p>
        </div>

        {/* Acceso al formulario de nuevos productos */}
        <Link
          to="/agregar-producto"
          className="add-product-button"
          aria-label="Agregar nuevo producto"
          title="Agregar producto"
        >
          <span aria-hidden="true">+</span>
        </Link>
      </section>

      {/* Indicadores del inventario */}
      <section className="stats" aria-label="Resumen del inventario">
        <div className="stat">
          <div className="stat-icon" aria-hidden="true">
            ▦
          </div>
          <span>Productos registrados</span>
          <strong>{products.length}</strong>
        </div>

        <div className="stat">
          <div className="stat-icon warning" aria-hidden="true">
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

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">
              CONTROL DE EXISTENCIAS
            </span>
            <h2>Productos registrados</h2>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={handleReset}
          >
            Restaurar inventario
          </button>
        </div>

        {/* Busqueda y categorias */}
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

        {/* Tabla administrativa */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Producto</th>
                <th scope="col">Categoría</th>
                <th scope="col">Precio</th>
                <th scope="col">Estado</th>
                <th scope="col">Unidades</th>
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
          <p className="empty" role="status">
            No se encontraron productos.
          </p>
        )}
      </section>
    </>
  );
}
