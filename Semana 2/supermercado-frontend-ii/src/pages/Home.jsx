import React, { useMemo, useState } from 'react';

const initialProducts = [
  { id: 1, nombre: 'Arroz grano largo 1 kg', categoria: 'Abarrotes', stock: 42, precio: 1590 },
  { id: 2, nombre: 'Leche entera 1 L', categoria: 'Lácteos', stock: 6, precio: 1290 },
  { id: 3, nombre: 'Aceite vegetal 900 ml', categoria: 'Abarrotes', stock: 26, precio: 2390 },
  { id: 4, nombre: 'Yogur natural 125 g', categoria: 'Lácteos', stock: 15, precio: 690 },
  { id: 5, nombre: 'Manzanas 1 kg', categoria: 'Frutas y verduras', stock: 34, precio: 1890 },
  { id: 6, nombre: 'Plátanos 1 kg', categoria: 'Frutas y verduras', stock: 5, precio: 1690 },
  { id: 7, nombre: 'Fideos spaghetti 400 g', categoria: 'Abarrotes', stock: 39, precio: 1090 },
  { id: 8, nombre: 'Queso laminado 250 g', categoria: 'Lácteos', stock: 12, precio: 3290 },
  { id: 9, nombre: 'Zanahorias 1 kg', categoria: 'Frutas y verduras', stock: 23, precio: 990 },
  { id: 10, nombre: 'Harina 1 kg', categoria: 'Abarrotes', stock: 20, precio: 1190 },
  { id: 11, nombre: 'Huevos 12 unidades', categoria: 'Lácteos', stock: 17, precio: 3490 },
  { id: 12, nombre: 'Papas 1 kg', categoria: 'Frutas y verduras', stock: 29, precio: 1490 }
];

const STORAGE_KEY = 'supermarket-inventario-v1';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

function loadProducts() {
  try {
    const data = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );
    return Array.isArray(data) ? data : initialProducts;
  } catch {
    return initialProducts;
  }
}

function Home() {
  const [products, setProducts] = useState(loadProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [notice, setNotice] = useState('');

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

  function changeStock(id, amount) {
    const updated = products.map((p) =>
      p.id === id
        ? { ...p, stock: Math.max(0, p.stock + amount) }
        : p
    );

    setProducts(updated);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
      setNotice('');
    } catch {
      setNotice('No se pudo guardar el cambio.');
    }
  }

  function reset() {
    setProducts(initialProducts);

    try {
      localStorage.removeItem(STORAGE_KEY);
      setNotice('Inventario restaurado.');
    } catch {
      setNotice('No se pudo actualizar el almacenamiento.');
    }
  }

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
