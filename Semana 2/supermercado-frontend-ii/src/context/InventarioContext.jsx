import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { initialProducts } from '../data/initialProducts.js';
import { loadProducts, saveProducts, isValidProduct } from '../services/inventarioStorage.js';

const InventarioContext = createContext(null);

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_STOCK':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.id
            ? { ...p, stock: Math.max(0, p.stock + action.amount) }
            : p
        ),
        notice: ''
      };
    case 'RESET':
      return { products: initialProducts.map(p => ({ ...p })), notice: 'Inventario restaurado.' };
    case 'ADD_PRODUCT':
      if (!isValidProduct(action.product) || state.products.some(p => String(p.id) === String(action.product.id))) {
        return { ...state, notice: 'No se pudo agregar el producto: datos inválidos o ID duplicado.' };
      }
      return { products: [...state.products, action.product], notice: 'Producto agregado correctamente.' };
    case 'NOTICE':
      return { ...state, notice: action.notice };
    default:
      return state;
  }
}

export function InventarioProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, undefined, loadProducts);

  // El almacenamiento se actualiza después de que React confirma el nuevo estado.
  // De este modo no se guardan datos calculados desde una versión anterior del inventario.
  useEffect(() => {
    if (!saveProducts(state.products)) {
      dispatch({ type: 'NOTICE', notice: 'No se pudieron guardar los cambios en este navegador.' });
    }
  }, [state.products]);

  const value = useMemo(() => ({
    products: state.products,
    notice: state.notice,
    changeStock: (id, amount) => dispatch({ type: 'CHANGE_STOCK', id, amount }),
    reset: () => dispatch({ type: 'RESET' }),
    addProduct: (product) => dispatch({ type: 'ADD_PRODUCT', product })
  }), [state.products, state.notice]);

  return <InventarioContext.Provider value={value}>{children}</InventarioContext.Provider>;
}

export function useInventario() {
  const context = useContext(InventarioContext);
  if (!context) throw new Error('useInventario debe usarse dentro de InventarioProvider');
  return context;
}
