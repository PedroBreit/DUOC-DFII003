import { initialProducts } from '../data/initialProducts.js';

const STORAGE_KEY = 'supermarket-inventario-v1';

export function isValidProduct(p) {
  return p !== null && typeof p === 'object' && !Array.isArray(p) &&
    ((Number.isSafeInteger(p.id) && p.id >= 0) ||
     (typeof p.id === 'string' && p.id.trim().length > 0)) &&
    typeof p.nombre === 'string' && p.nombre.trim().length > 0 &&
    typeof p.categoria === 'string' && p.categoria.trim().length > 0 &&
    Number.isSafeInteger(p.stock) && p.stock >= 0 &&
    typeof p.precio === 'number' && Number.isFinite(p.precio) && p.precio >= 0 &&
    (p.marca === undefined || typeof p.marca === 'string') &&
    (p.tipo === undefined || typeof p.tipo === 'string');
}

export function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return { products: initialProducts, notice: '' };
    const stored = JSON.parse(raw);
    const valid = Array.isArray(stored) && stored.every(isValidProduct) &&
      new Set(stored.map(p => String(p.id))).size === stored.length;
    if (!valid) {
      return {
        products: initialProducts,
        notice: 'Datos guardados no válidos. Se restauró el inventario inicial.'
      };
    }
    return { products: stored, notice: '' };
  } catch {
    return {
      products: initialProducts,
      notice: 'No se pudo recuperar el inventario. Se utilizaron los datos iniciales.'
    };
  }
}

export function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch {
    return false;
  }
}
