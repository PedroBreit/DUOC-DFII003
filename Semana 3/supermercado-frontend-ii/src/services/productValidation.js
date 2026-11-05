
import {
  isValidProduct
} from './inventarioStorage.js';

const TEXT_PATTERN = /^(?=.*[\p{L}\p{N}])[^\p{C}]+$/u;
const INTEGER_PATTERN = /^\d+$/;

const MAX_LENGTHS = {
  nombre: 120,
  marca: 80,
  tipo: 80
};

function normalizeText(value) {
  return typeof value === 'string'
    ? value.trim()
    : '';
}

function isValidText(value, maxLength) {
  const text = normalizeText(value);

  return (
    text.length > 0 &&
    text.length <= maxLength &&
    TEXT_PATTERN.test(text)
  );
}

function parseNonNegativeInteger(value) {
  const text = String(value ?? '').trim();

  if (!INTEGER_PATTERN.test(text)) {
    return null;
  }

  const number = Number(text);

  return Number.isSafeInteger(number)
    ? number
    : null;
}

function normalizeProductName(value) {
  return normalizeText(value)
    .toLocaleLowerCase('es');
}

export function isDuplicateProduct(product, products) {
  const name = normalizeProductName(product.nombre);
  const brand = normalizeProductName(product.marca);

  return products.some((existing) => {
    return (
      normalizeProductName(existing.nombre) === name &&
      normalizeProductName(existing.marca) === brand
    );
  });
}

export function validateProductForm(form) {
  const nombre = normalizeText(form.nombre);
  const marca = normalizeText(form.marca);
  const tipo = normalizeText(form.tipo);
  const categoria = normalizeText(form.categoria);

  if (!nombre || !marca || !tipo || !categoria) {
    return {
      ok: false,
      error: 'Completa todos los campos obligatorios.'
    };
  }

  if (!isValidText(nombre, MAX_LENGTHS.nombre)) {
    return {
      ok: false,
      error: 'Ingresa un nombre válido de hasta 120 caracteres.'
    };
  }

  if (!isValidText(marca, MAX_LENGTHS.marca)) {
    return {
      ok: false,
      error: 'Ingresa una marca válida de hasta 80 caracteres.'
    };
  }

  if (!isValidText(tipo, MAX_LENGTHS.tipo)) {
    return {
      ok: false,
      error: 'Ingresa un tipo de producto válido de hasta 80 caracteres.'
    };
  }

  if (!TEXT_PATTERN.test(categoria)) {
    return {
      ok: false,
      error: 'Selecciona una categoría válida.'
    };
  }

  const precio = parseNonNegativeInteger(form.precio);

  if (precio === null) {
    return {
      ok: false,
      error: 'El precio debe ser un número entero mayor o igual a cero.'
    };
  }

  const stock = parseNonNegativeInteger(form.stock);

  if (stock === null) {
    return {
      ok: false,
      error: 'El stock debe ser un número entero mayor o igual a cero.'
    };
  }

  return {
    ok: true,
    product: {
      nombre,
      marca,
      tipo,
      categoria,
      precio,
      stock
    }
  };
}

export function validateProductRegistration(product, products) {
  if (!isValidProduct(product)) {
    return {
      ok: false,
      error: 'Los datos del producto no son válidos.'
    };
  }

  const result = validateProductForm(product);

  if (!result.ok) {
    return result;
  }

  const duplicatedId = products.some(
    (existing) =>
      String(existing.id) === String(product.id)
  );

  if (duplicatedId) {
    return {
      ok: false,
      error: 'Ya existe un producto con ese identificador.'
    };
  }

  if (isDuplicateProduct(product, products)) {
    return {
      ok: false,
      error: 'Ya existe un producto con ese nombre y marca.'
    };
  }

  return {
    ok: true,
    product: {
      id: product.id,
      ...result.product
    }
  };
}
