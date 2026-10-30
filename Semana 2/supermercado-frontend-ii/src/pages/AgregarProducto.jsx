
import { Link } from 'react-router-dom';

export default function AgregarProducto() {
  return (
    <section className="content-page">
      <span className="eyebrow">
        ADMINISTRACIÓN
      </span>

      <h1>Agregar producto</h1>

      <p className="lead">
        Aquí incorporaremos el formulario para
        registrar nuevos artículos en el inventario.
      </p>

      <p>
        El formulario permitirá ingresar nombre,
        marca, tipo, categoría, precio y stock inicial.
      </p>

      <Link
        className="secondary-button"
        to="/inventario"
      >
        Volver al inventario
      </Link>
    </section>
  );
}
