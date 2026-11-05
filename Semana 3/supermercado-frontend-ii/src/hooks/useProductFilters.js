
import { useMemo, useState } from 'react';

/**
 * Administra la búsqueda y el filtrado de productos.
 * No modifica el inventario original.
 */
export function useProductFilters(products) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  // Obtener las categorías disponibles del inventario.
  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map((product) => product.categoria)
      )
    ];
  }, [products]);

  // Obtener los productos que cumplen ambos filtros.
  const filteredProducts = useMemo(() => {
    const query = search
      .trim()
      .toLocaleLowerCase('es');

    return products.filter((product) => {
      const matchesCategory =
        category === 'Todas' ||
        product.categoria === category;

      const searchable = [
        product.nombre,
        product.marca,
        product.tipo,
        product.categoria
      ]
        .join(' ')
        .toLocaleLowerCase('es');

      const matchesSearch = searchable.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filteredProducts
  };
}
