
import { Link } from 'react-router-dom';

// Importar automáticamente las imágenes locales de libros
const portadas = import.meta.glob(
  '../assets/images/libros/*.webp',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

export default function LibroCard({ libro }) {
  const rutaImagen = `../assets/images/libros/${libro.imagen}`;
  const portada = portadas[rutaImagen];

  return (
    <article className="libro-card">
      <div className="libro-portada">
        {portada ? (
          <img
            src={portada}
            alt={`Ilustración de ${libro.titulo}`}
            loading="lazy"
          />
        ) : (
          <div className="portada-alternativa">
            <span>{libro.titulo}</span>
          </div>
        )}
      </div>

      <div className="libro-contenido">
        <h2>{libro.titulo}</h2>

        <p className="libro-autor">
          {libro.autor}
        </p>

        <p className="libro-anio">
          Publicado en {libro.anio}
        </p>

        <Link
          className="boton-secundario"
          to={`/libros/${libro.id}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
