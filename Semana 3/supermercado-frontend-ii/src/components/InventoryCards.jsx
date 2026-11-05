
import { Link } from 'react-router-dom';

import {
  InventoryDetailLink,
  InventoryStatus,
  InventoryStockControls
} from './InventoryShared.jsx';

import { formatCurrency } from '../utils/formatCurrency.js';

export default function InventoryCards({
  products,
  changeStock
}) {
  return (
    <div className="inventory-mobile">
      {products.map((product) => (
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

            <InventoryStatus stock={product.stock} />
          </div>

          <div className="inventory-card-details">
            <div className="inventory-card-row">
              <span>
                Categoría
              </span>

              <strong>
                {product.categoria}
              </strong>
            </div>

            <div className="inventory-card-row">
              <span>
                Precio
              </span>

              <strong className="inventory-price">
                {formatCurrency(product.precio)}
              </strong>
            </div>

            <div className="inventory-card-row inventory-card-stock">
              <span>
                Unidades
              </span>

              <InventoryStockControls
                product={product}
                changeStock={changeStock}
              />
            </div>
          </div>

          <InventoryDetailLink product={product} />
        </article>
      ))}
    </div>
  );
}
