
import { Link } from 'react-router-dom';

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
    return {
      label: 'Sin stock',
      style: stockStyles.empty
    };
  }

  if (stock < 10) {
    return {
      label: 'Stock bajo',
      style: stockStyles.low
    };
  }

  return {
    label: 'Disponible',
    style: stockStyles.available
  };
}

export function InventoryStatus({ stock }) {
  const status = getStockStatus(stock);

  return (
    <span
      className="inventory-status"
      style={status.style}
    >
      {status.label}
    </span>
  );
}

export function InventoryStockControls({
  product,
  changeStock
}) {
  return (
    <div
      className="quantity inventory-quantity"
      role="group"
      aria-label={`Existencias de ${product.nombre}`}
    >
      <button
        type="button"
        disabled={product.stock === 0}
        onClick={() =>
          changeStock(product.id, -1)
        }
        aria-label={`Reducir stock de ${product.nombre}`}
      >
        −
      </button>

      <strong aria-live="polite">
        {product.stock}
      </strong>

      <button
        type="button"
        onClick={() =>
          changeStock(product.id, 1)
        }
        aria-label={`Aumentar stock de ${product.nombre}`}
      >
        +
      </button>
    </div>
  );
}

export function InventoryDetailLink({ product }) {
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
