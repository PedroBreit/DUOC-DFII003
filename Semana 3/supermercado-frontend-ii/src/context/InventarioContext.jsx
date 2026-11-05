
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';

import { initialProducts } from '../data/initialProducts.js';

import {
  loadProducts,
  saveProducts
} from '../services/inventarioStorage.js';

import {
  validateProductRegistration
} from '../services/productValidation.js';

const InventarioContext = createContext(null);
const CART_KEY = 'supermarket-carrito-v1';

function loadInitialState() {
  const { products, notice } = loadProducts();
  let cart = [];

  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_KEY) || '[]'
    );

    if (Array.isArray(saved)) {
      const unique = new Set();

      cart = saved
        .filter((item) => {
          if (
            !item ||
            !Number.isSafeInteger(item.quantity) ||
            item.quantity <= 0 ||
            unique.has(String(item.id)) ||
            !products.some(
              (p) => String(p.id) === String(item.id)
            )
          ) {
            return false;
          }

          unique.add(String(item.id));
          return true;
        })
        .map((item) => ({
          id: item.id,
          quantity: item.quantity
        }));
    }
  } catch {
    cart = [];
  }

  return { products, cart, notice };
}

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const result = validateProductRegistration(
        action.product,
        state.products
      );

      if (!result.ok) {
        return {
          ...state,
          notice: result.error
        };
      }

      return {
        ...state,
        products: [
          ...state.products,
          result.product
        ],
        notice: 'Producto agregado correctamente.'
      };
    }

    case 'CHANGE_STOCK': {
      const amount = action.amount;

      if (!Number.isSafeInteger(amount)) {
        return state;
      }

      return {
        ...state,
        products: state.products.map((p) =>
          String(p.id) === String(action.id)
            ? {
                ...p,
                stock: Math.max(0, p.stock + amount)
              }
            : p
        ),
        notice: ''
      };
    }

    case 'ADD_TO_CART': {
      const quantity = action.quantity ?? 1;

      if (
        !Number.isSafeInteger(quantity) ||
        quantity <= 0
      ) {
        return state;
      }

      const product = state.products.find(
        (p) => String(p.id) === String(action.id)
      );

      if (!product || product.stock < quantity) {
        return {
          ...state,
          notice: 'No hay stock suficiente.'
        };
      }

      const exists = state.cart.some(
        (item) => String(item.id) === String(action.id)
      );

      const cart = exists
        ? state.cart.map((item) =>
            String(item.id) === String(action.id)
              ? {
                  ...item,
                  quantity: item.quantity + quantity
                }
              : item
          )
        : [
            ...state.cart,
            { id: product.id, quantity }
          ];

      return {
        ...state,
        products: state.products.map((p) =>
          String(p.id) === String(action.id)
            ? { ...p, stock: p.stock - quantity }
            : p
        ),
        cart,
        notice: `${quantity} unidad(es) agregada(s) al carrito.`
      };
    }

    case 'REMOVE_FROM_CART': {
      const item = state.cart.find(
        (p) => String(p.id) === String(action.id)
      );

      const quantity = action.quantity ?? 1;

      if (
        !item ||
        !Number.isSafeInteger(quantity) ||
        quantity <= 0
      ) {
        return state;
      }

      const returned = Math.min(
        quantity,
        item.quantity
      );

      const remaining = item.quantity - returned;

      return {
        ...state,
        cart: remaining === 0
          ? state.cart.filter(
              (p) => String(p.id) !== String(action.id)
            )
          : state.cart.map((p) =>
              String(p.id) === String(action.id)
                ? {
                    ...p,
                    quantity: remaining
                  }
                : p
            ),
        products: state.products.map((p) =>
          String(p.id) === String(action.id)
            ? {
                ...p,
                stock: p.stock + returned
              }
            : p
        ),
        notice: 'Inventario actualizado.'
      };
    }

    case 'CLEAR_CART': {
      const quantities = new Map(
        state.cart.map((item) => [
          String(item.id),
          item.quantity
        ])
      );

      return {
        ...state,
        products: state.products.map((p) => ({
          ...p,
          stock:
            p.stock +
            (quantities.get(String(p.id)) || 0)
        })),
        cart: [],
        notice: 'Carrito vaciado. Stock devuelto.'
      };
    }

    case 'CHECKOUT':
      return {
        ...state,
        cart: [],
        notice: 'Compra realizada correctamente.'
      };

    case 'RESET':
      return {
        products: initialProducts.map((p) => ({
          ...p
        })),
        cart: [],
        notice: 'Inventario y carrito restaurados.'
      };

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
    loadInitialState
  );

  useEffect(() => {
    if (!saveProducts(state.products)) {
      console.error(
        'No se pudo guardar el inventario.'
      );
    }
  }, [state.products]);

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(state.cart)
      );
    } catch {
      console.error(
        'No se pudo guardar el carrito.'
      );
    }
  }, [state.cart]);

  const cartProducts = useMemo(
    () =>
      state.cart
        .map((item) => {
          const product = state.products.find(
            (p) =>
              String(p.id) === String(item.id)
          );

          return product
            ? {
                ...product,
                quantity: item.quantity
              }
            : null;
        })
        .filter(Boolean),
    [state.cart, state.products]
  );

  const cartCount = cartProducts.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartTotal = cartProducts.reduce(
    (total, item) =>
      total + item.precio * item.quantity,
    0
  );

  function addProduct(product) {
    const result = validateProductRegistration(
      product,
      state.products
    );

    if (!result.ok) {
      return {
        ok: false,
        error: result.error
      };
    }

    dispatch({
      type: 'ADD_PRODUCT',
      product: result.product
    });

    return {
      ok: true
    };
  }

  const value = {
    products: state.products,
    cart: state.cart,
    cartProducts,
    cartCount,
    cartTotal,
    notice: state.notice,

    addProduct,

    changeStock: (id, amount) =>
      dispatch({
        type: 'CHANGE_STOCK',
        id,
        amount
      }),

    addToCart: (id, quantity = 1) =>
      dispatch({
        type: 'ADD_TO_CART',
        id,
        quantity
      }),

    removeFromCart: (id, quantity = 1) =>
      dispatch({
        type: 'REMOVE_FROM_CART',
        id,
        quantity
      }),

    clearCart: () =>
      dispatch({
        type: 'CLEAR_CART'
      }),

    checkout: () =>
      dispatch({
        type: 'CHECKOUT'
      }),

    reset: () =>
      dispatch({
        type: 'RESET'
      })
  };

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
      'useInventario debe utilizarse dentro de InventarioProvider'
    );
  }

  return context;
}
