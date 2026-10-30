
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react';

import { initialProducts } from '../data/initialProducts.js';

import {
  loadProducts,
  saveProducts,
  isValidProduct
} from '../services/inventarioStorage.js';

const InventarioContext = createContext(null);

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_STOCK':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? {
                ...product,
                stock: Math.max(
                  0,
                  product.stock + action.amount
                )
              }
            : product
        ),
        notice: ''
      };

    case 'RESET':
      return {
        ...state,
        products: initialProducts.map((p) => ({ ...p })),
        notice: 'Inventario restaurado.'
      };

    case 'ADD_PRODUCT': {
      const duplicated = state.products.some(
        (p) => String(p.id) === String(action.product.id)
      );

      if (!isValidProduct(action.product) || duplicated) {
        return {
          ...state,
          notice:
            'No se pudo agregar el producto: datos inválidos o ID duplicado.'
        };
      }

      return {
        ...state,
        products: [...state.products, action.product],
        notice: 'Producto agregado correctamente.'
      };
    }

    case 'PURCHASE': {
      const items = action.items;

      const invalidCart =
        !Array.isArray(items) ||
        items.length === 0 ||
        items.some(
          (item) =>
            !item ||
            !Number.isSafeInteger(item.quantity) ||
            item.quantity <= 0
        ) ||
        new Set(items.map((item) => String(item.id))).size !==
          items.length;

      if (invalidCart) {
        return {
          ...state,
          purchaseResult: {
            id: action.requestId,
            success: false,
            message: 'El carrito no contiene productos válidos.'
          }
        };
      }

      const insufficientStock = items.some((item) => {
        const product = state.products.find(
          (p) => String(p.id) === String(item.id)
        );

        return (
          !product ||
          product.stock < item.quantity
        );
      });

      if (insufficientStock) {
        return {
          ...state,
          purchaseResult: {
            id: action.requestId,
            success: false,
            message:
              'No hay existencias suficientes. Revisa las cantidades del carrito.'
          }
        };
      }

      const quantities = new Map(
        items.map((item) => [
          String(item.id),
          item.quantity
        ])
      );

      const updatedProducts = state.products.map((product) => ({
        ...product,
        stock:
          product.stock -
          (quantities.get(String(product.id)) || 0)
      }));

      return {
        ...state,
        products: updatedProducts,
        notice: '',
        purchaseResult: {
          id: action.requestId,
          success: true,
          message: '¡Compra realizada correctamente!'
        }
      };
    }

    case 'NOTICE':
      return {
        ...state,
        notice: action.notice
      };

    default:
      return state;
  }
}

export function InventarioProvider({ children }) {
  const [state, dispatch] = useReducer(
    inventoryReducer,
    undefined,
    () => ({
      ...loadProducts(),
      purchaseResult: null
    })
  );

  const nextPurchaseId = useRef(0);

  useEffect(() => {
    if (!saveProducts(state.products)) {
      dispatch({
        type: 'NOTICE',
        notice:
          'No se pudieron guardar los cambios en este navegador.'
      });
    }
  }, [state.products]);

  const value = useMemo(
    () => ({
      products: state.products,
      notice: state.notice,
      purchaseResult: state.purchaseResult,

      changeStock: (id, amount) => {
        dispatch({
          type: 'CHANGE_STOCK',
          id,
          amount
        });
      },

      reset: () => {
        dispatch({ type: 'RESET' });
      },

      addProduct: (product) => {
        dispatch({
          type: 'ADD_PRODUCT',
          product
        });
      },

      purchase: (items) => {
        nextPurchaseId.current += 1;

        const requestId = nextPurchaseId.current;

        dispatch({
          type: 'PURCHASE',
          items,
          requestId
        });

        return requestId;
      }
    }),
    [
      state.products,
      state.notice,
      state.purchaseResult
    ]
  );

  return (
    <InventarioContext.Provider value={value}>
      {children}
    </InventarioContext.Provider>
  );
}

export function useInventario() {
  const context = useContext(InventarioContext);

  if (!context) {
    throw new Error(
      'useInventario debe usarse dentro de InventarioProvider'
    );
  }

  return context;
}
