'use client'
import Link from "next/link";

export default function AuctionCard({ auction, onDeleteClick }) {

    return (
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">

                            { /* IMAGE */}
                            <a href="#" className="shrink-0 md:order-1">
                                <img className="hidden h-20 w-20 dark:block" src={auction.image} />
                            </a>

                            { /* PRICES AND DATES */}
                            <div className="grid grid-cols-2 gap-4 md:order-3">
                                <label className="text-sm font-medium text-gray-500">
                                    Fecha de Inicio
                                    <div className="flex flex-col items-start">
                                        <p className="text-base font-bold text-gray-900">
                                            {new Date(auction.initDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-base font-bold text-gray-900">
                                            {auction.initHour}
                                        </p>
                                    </div>
                                </label>

                                <label className="text-sm font-medium text-gray-500">
                                    Fecha de Cierre
                                    <div className="flex flex-col items-start">
                                        <p className="text-base font-bold text-gray-900">
                                            {new Date(auction.endDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-base font-bold text-gray-900">
                                            {auction.endHour}
                                        </p>
                                    </div>
                                </label>


                                <label className="text-sm font-medium text-gray-500">
                                    Precio Base
                                    <div className="flex items-center">
                                        <p className="text-base font-bold text-gray-900">{auction.basePrice}</p>
                                    </div>
                                </label>

                                <label className="text-sm font-medium text-gray-500">
                                    Precio de Reserva
                                    <div className="flex items-center">
                                        <p className="text-base font-bold text-gray-900">{auction.resPrice}</p>
                                    </div>
                                </label>

                                <div className="mb-2 mt-4">
                                    <span className="me-2 rounded bg-brand bg-opacity-20 px-4 py-1 text-base font-semibold text-brand">
                                        Cantidad: {auction.prodQuantity}
                                    </span>
                                </div>

                            </div>


                            <div className="w-full min-w-0 flex-1 space-y-2.5 md:order-2 md:max-w-md">
                                <p href="#" className="text-lg font-bold text-gray-900 ">{auction.name}</p>

                                <p href="#" className="text-base font-small text-gray-600 ">
                                    <a href="#" className="text-base font-medium text-gray-800 ">Descripcion: </a>
                                    {auction.description}
                                </p>

                                <p href="#" className="text-base font-small text-gray-600 ">
                                    <a href="#" className="text-base font-medium text-gray-800 ">Condiciones: </a>
                                    {auction.conditions}
                                </p>

                                <p href="#" className="text-base font-small text-gray-600 ">
                                    <a href="#" className="text-base font-medium text-gray-800 ">Incremento Minimo de Puja: </a>
                                    {auction.minIncrement}
                                </p>



                                <div className="flex items-center gap-4">

                                    <Link href={`/Auction/${auction.id}`} className="flex items-center gap-1 rounded-lg p-2  text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                        Modificar
                                    </Link>

                                    <button
                                        type="button"
                                        id={`Delete-${auction.id}`}
                                        className="flex items-center gap-1 rounded-lg p-2  text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                        onClick={onDeleteClick}
                                    >
                                        <span className="sr-only">Borrar</span>
                                        <svg
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM3 5h18M19 7l-.866 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7h14Z"
                                            />
                                        </svg>
                                        <span>Eliminar</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}