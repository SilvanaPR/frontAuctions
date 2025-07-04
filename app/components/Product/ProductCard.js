'use client'
import Link from "next/link";

export default function ProductCard({ product, onDeleteClick }) {

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="h-56 w-full">
        {/* IMAGE */}
        <a href="#">
          <img
            className="object-contain mx-auto h-full"
            src={product.productImage}
            alt={product.productName}
          />
        </a>
      </div>


      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-brand bg-opacity-20 px-2.5 py-0.5 text-xs font-medium text-brand">{product.category_name}</span>
        </div>

        <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">{product.productName}</a>

        {/* DESCRIPTION */}
        <div className="mt-2 text-sm font-medium text-gray-500 break-words">
          {product.productDescription}
        </div>

        <div className="mt-2 text-sm font-medium text-gray-500 break-words">
          <p>
            ( Disponibles: {product.productStock} )
          </p>
        </div>




        <div className="mt-4 flex items-center justify-between gap-4">
          {/* PRICE */}
          <p className="text-2xl font-extrabold leading-tight text-gray-900">${product.productPrice}</p>

          {/* BUTTONS */}

          <div className="flex items-center justify-end gap-1">
            <Link href={`/Product/${product.productId}`} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </Link>

            <button
              type="button"
              id={`Delete-${product.productId}`}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              onClick={onDeleteClick}
            >
              <span className="sr-only">Borrar</span>
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM3 5h18M19 7l-.866 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7h14Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}