
function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

export default function QuantityControl({
  productName,
  quantity,
  availableStock,
  onIncrease,
  onDecrease,
  variant = 'catalog'
}) {
  const isCart = variant === 'cart';
  const isOutOfStock = availableStock <= 0;
  const shouldDelete = quantity === 1;

  const containerClass = isCart
    ? 'flex h-12 w-44 items-stretch overflow-hidden rounded-xl border border-blue-600'
    : 'flex min-h-12 w-full items-stretch overflow-hidden rounded-xl border border-blue-600';

  const decreaseClass = isCart
    ? 'flex h-full w-12 shrink-0 items-center justify-center bg-blue-600 text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white'
    : 'flex h-12 w-14 items-center justify-center bg-blue-600 text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white';

  const countClass = isCart
    ? 'flex flex-1 items-center justify-center bg-white text-lg font-extrabold text-blue-600'
    : 'flex h-12 flex-1 items-center justify-center bg-white text-lg font-extrabold text-blue-600';

  const increaseClass = isCart
    ? 'flex h-full w-12 shrink-0 items-center justify-center bg-blue-600 text-2xl text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500'
    : 'flex h-12 w-14 items-center justify-center bg-blue-600 text-2xl text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500';

  return (
    <div
      className={containerClass}
      role="group"
      aria-label={
        isCart
          ? `Cantidad de ${productName}`
          : `Cantidad de ${productName} en el carrito`
      }
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label={
          shouldDelete
            ? `Eliminar ${productName} del carrito`
            : `Disminuir cantidad de ${productName}`
        }
        title={
          shouldDelete
            ? 'Eliminar del carrito'
            : 'Disminuir cantidad'
        }
        className={decreaseClass}
      >
        {shouldDelete ? (
          <TrashIcon />
        ) : (
          <span
            aria-hidden="true"
            className="text-2xl"
          >
            −
          </span>
        )}
      </button>

      <span
        className={countClass}
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={isOutOfStock}
        aria-label={`Aumentar cantidad de ${productName}`}
        title={
          isOutOfStock
            ? 'Sin stock disponible'
            : 'Agregar una unidad'
        }
        className={increaseClass}
      >
        +
      </button>
    </div>
  );
}
