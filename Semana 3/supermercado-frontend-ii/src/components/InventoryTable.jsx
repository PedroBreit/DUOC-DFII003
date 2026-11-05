
import { Link } from 'react-router-dom';

import {
  InventoryDetailLink,
  InventoryStatus,
  InventoryStockControls
} from './InventoryShared.jsx';

import { formatCurrency } from '../utils/formatCurrency.js';

export default function InventoryTable({
  products,
  changeStock
}) {
  return (
    <div className="inventory-desktop">
      <div className="inventory-table-scroll">
        <table className="inventory-table">
          <thead>
            <tr>
              <th scope="col">
                Producto
              </th>

              <th scope="col">
                Categoría
              </th>

              <th scope="col">
                Precio
              </th>

              <th scope="col">
                Estado
              </th>

              <th scope="col">
                Unidades
              </th>

              <th scope="col">
                Detalle
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
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

                <td>
                  {product.categoria}
                </td>

                <td className="inventory-price">
                  {formatCurrency(product.precio)}
                </td>

                <td>
                  <InventoryStatus stock={product.stock} />
                </td>

                <td>
                  <InventoryStockControls
                    product={product}
                    changeStock={changeStock}
                  />
                </td>

                <td>
                  <InventoryDetailLink product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
