
import { Link } from 'react-router-dom';

import FilterBar from '../components/FilterBar.jsx';
import InventoryCards from '../components/InventoryCards.jsx';
import InventoryTable from '../components/InventoryTable.jsx';

import { useInventario } from '../context/InventarioContext.jsx';
import { useProductFilters } from '../hooks/useProductFilters.js';

import './Inventario.css';

export default function Inventario() {
  const {
    products,
    notice,
    changeStock,
    reset
  } = useInventario();

  const {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filteredProducts
  } = useProductFilters(products);

  const lowStock = products.filter(
    (product) =>
      product.stock > 0 && product.stock < 10
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
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
        <h1>
          Inventario
        </h1>

        <Link
          to="/agregar-producto"
          className="inventory-add-button"
          title="Agregar producto"
          aria-label="Agregar nuevo producto"
        >
          <span aria-hidden="true">
            +
          </span>
        </Link>
      </section>

      {/* RESUMEN DEL INVENTARIO */}
      <section
        className="stats inventory-stats"
        aria-label="Resumen del inventario"
      >
        <div className="stat">
          <div
            className="stat-icon"
            aria-hidden="true"
          >
            ▦
          </div>

          <span>
            Productos registrados
          </span>

          <strong>
            {products.length}
          </strong>
        </div>

        <div className="stat">
          <div
            className="stat-icon warning"
            aria-hidden="true"
          >
            !
          </div>

          <span>
            Stock bajo
          </span>

          <strong>
            {lowStock}
          </strong>
        </div>

        <div className="stat">
          <div
            className="stat-icon"
            aria-hidden="true"
          >
            ◫
          </div>

          <span>
            Productos agotados
          </span>

          <strong>
            {outOfStock}
          </strong>
        </div>
      </section>

      {/* PANEL PRINCIPAL */}
      <section className="panel inventory-panel">
        <div className="panel-header inventory-panel-header">
          <div>
            <span className="eyebrow">
              CONTROL DE EXISTENCIAS
            </span>

            <h2>
              Productos registrados
            </h2>

            <p className="inventory-results">
              Mostrando {filteredProducts.length} de {products.length} productos
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

        {/* FILTROS COMPARTIDOS */}
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          className="inventory-filters"
        />

        {/* AVISOS DEL CONTEXTO */}
        {notice && (
          <p
            className="notice"
            role="status"
          >
            {notice}
          </p>
        )}

        {/* TABLA PARA ESCRITORIO */}
        <InventoryTable
          products={filteredProducts}
          changeStock={changeStock}
        />

        {/* TARJETAS PARA MÓVIL Y TABLET */}
        <InventoryCards
          products={filteredProducts}
          changeStock={changeStock}
        />

        {/* SIN RESULTADOS */}
        {filteredProducts.length === 0 && (
          <p
            className="empty"
            role="status"
          >
            No se encontraron productos con los filtros seleccionados.
          </p>
        )}
      </section>
    </div>
  );
}
