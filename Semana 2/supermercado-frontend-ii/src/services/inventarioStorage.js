
import { initialProducts } from '../data/initialProducts.js';

const STORAGE_KEY = 'supermarket-inventario-v1';

// Validar la estructura completa de un producto.
export function isValidProduct(product) {
  if (
    product === null ||
    typeof product !== 'object' ||
    Array.isArray(product)
  ) {
    return false;
  }

  const validId =
    (Number.isSafeInteger(product.id) && product.id >= 0) ||
    (typeof product.id === 'string' &&
      product.id.trim().length > 0);

  const validText = (value) =>
    typeof value === 'string' &&
    value.trim().length > 0;

  return (
    validId &&
    validText(product.nombre) &&
    validText(product.marca) &&
    validText(product.tipo) &&
    validText(product.categoria) &&
    Number.isSafeInteger(product.stock) &&
    product.stock >= 0 &&
    typeof product.precio === 'number' &&
    Number.isFinite(product.precio) &&
    product.precio >= 0
  );
}

// Completar campos antiguos sin modificar las existencias.
function migrateProduct(product) {
  if (
    product === null ||
    typeof product !== 'object' ||
    Array.isArray(product)
  ) {
    return product;
  }

  const original = initialProducts.find(
    (item) => String(item.id) === String(product.id)
  );

  const validText = (value) =>
    typeof value === 'string' &&
    value.trim().length > 0;

  return {
    ...product,
    marca: validText(product.marca)
      ? product.marca
      : original?.marca || 'Sin especificar',

    tipo: validText(product.tipo)
      ? product.tipo
      : original?.tipo || 'Sin especificar'
  };
}

// Recuperar y validar los productos almacenados.
export function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw === null) {
      return {
        products: initialProducts,
        notice: ''
      };
    }

    const stored = JSON.parse(raw);

    if (!Array.isArray(stored)) {
      return {
        products: initialProducts,
        notice: 'Datos inválidos. Se restauró el inventario inicial.'
      };
    }

    const migrated = stored.map(migrateProduct);

    const validProducts = migrated.every(isValidProduct);

    const uniqueIds =
      new Set(migrated.map((p) => String(p.id))).size ===
      migrated.length;

    if (!validProducts || !uniqueIds) {
      return {
        products: initialProducts,
        notice:
          'Se encontraron datos inválidos. Se restauró el inventario inicial.'
      };
    }

    const wasMigrated = stored.some(
      (product, index) =>
        product.marca !== migrated[index].marca ||
        product.tipo !== migrated[index].tipo
    );

    return {
      products: migrated,
      notice: wasMigrated
        ? 'Se actualizaron los datos antiguos del inventario.'
        : ''
    };
  } catch {
    return {
      products: initialProducts,
      notice:
        'No se pudo recuperar el inventario. Se utilizaron los datos iniciales.'
    };
  }
}

// Guardar inventario en el navegador.
export function saveProducts(products) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    );

    return true;
  } catch {
    return false;
  }
}
