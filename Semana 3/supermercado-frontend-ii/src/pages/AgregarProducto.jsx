
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext.jsx';
import './AgregarProducto.css';

const initialForm = {
  nombre: '',
  marca: '',
  tipo: '',
  categoria: '',
  precio: '',
  stock: ''
};

export default function AgregarProducto() {
  const navigate = useNavigate();
  const { addProduct, products } = useInventario();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nombre = form.nombre.trim();
    const marca = form.marca.trim();
    const tipo = form.tipo.trim();
    const categoria = form.categoria.trim();
    const precio = Number(form.precio);
    const stock = Number(form.stock);

    if (!nombre || !marca || !tipo || !categoria) {
      setError('Completa todos los campos obligatorios.');
      return;
    }

    if (
      form.precio.trim() === '' ||
      !Number.isFinite(precio) ||
      precio < 0 ||
      !Number.isSafeInteger(precio)
    ) {
      setError('Ingresa un precio válido en pesos chilenos.');
      return;
    }

    if (
      form.stock.trim() === '' ||
      !Number.isSafeInteger(stock) ||
      stock < 0
    ) {
      setError('El stock debe ser un número entero mayor o igual a cero.');
      return;
    }

    const duplicated = products.some(
      (product) =>
        product.nombre.trim().toLocaleLowerCase('es') ===
          nombre.toLocaleLowerCase('es') &&
        product.marca.trim().toLocaleLowerCase('es') ===
          marca.toLocaleLowerCase('es')
    );

    if (duplicated) {
      setError(
        'Ya existe un producto con ese nombre y marca.'
      );
      return;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      nombre,
      marca,
      tipo,
      categoria,
      precio,
      stock
    };

    addProduct(newProduct);
    navigate('/inventario');
  }

  return (
    <section className="add-page">
      <div className="add-page-header">
        <Link
          to="/inventario"
          className="add-back-link"
        >
          ← Volver al inventario
        </Link>

        <h1>Agregar producto</h1>
      </div>

      <div className="panel add-product-panel">
        <form
          className="add-product-form"
          onSubmit={handleSubmit}
        >
          <div className="add-form-grid">
            <label className="add-field">
              <span>Nombre del producto *</span>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej. Leche descremada 1 L"
                maxLength={120}
                required
              />
            </label>

            <label className="add-field">
              <span>Marca *</span>
              <input
                type="text"
                name="marca"
                value={form.marca}
                onChange={handleChange}
                placeholder="Ej. Colun"
                maxLength={80}
                required
              />
            </label>

            <label className="add-field">
              <span>Tipo de producto *</span>
              <input
                type="text"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                placeholder="Ej. Leche"
                maxLength={80}
                required
              />
            </label>

            <label className="add-field">
              <span>Categoría *</span>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                required
              >
                <option value="">
                  Selecciona una categoría
                </option>
                <option value="Abarrotes">
                  Abarrotes
                </option>
                <option value="Lácteos">
                  Lácteos
                </option>
                <option value="Frutas y verduras">
                  Frutas y verduras
                </option>
                <option value="Bebidas">
                  Bebidas
                </option>
                <option value="Limpieza">
                  Limpieza
                </option>
                <option value="Higiene personal">
                  Higiene personal
                </option>
                <option value="Congelados">
                  Congelados
                </option>
                <option value="Otros">
                  Otros
                </option>
              </select>
            </label>

            <label className="add-field">
              <span>Precio (CLP) *</span>
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="Ej. 1590"
                min="0"
                step="1"
                required
              />
            </label>

            <label className="add-field">
              <span>Stock inicial *</span>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Ej. 20"
                min="0"
                step="1"
                required
              />
            </label>
          </div>

          {error && (
            <p className="add-form-error" role="alert">
              {error}
            </p>
          )}

          <div className="add-form-actions">
            <Link
              to="/inventario"
              className="secondary-button"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="primary-button"
            >
              Guardar producto
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
