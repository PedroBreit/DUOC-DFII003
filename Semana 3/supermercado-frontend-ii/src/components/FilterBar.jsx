
export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  className = ''
}) {
  return (
    <div className={`filters ${className}`.trim()}>
      <label className="search-field">
        <span className="sr-only">
          Buscar producto
        </span>

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Buscar producto..."
        />
      </label>

      <label className="category-field">
        <span className="sr-only">
          Filtrar por categoría
        </span>

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
        >
          <option value="Todas">
            Todas las categorías
          </option>

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
