"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createAuction, modifyAuction } from "../../../lib/features/auction/auctionSlice";
import { fetchProducts } from "../../../lib/features/product/productSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Datepicker } from 'flowbite';
import ConfirmationModal from "../ConfirmationModal";
import { ToastContainer, toast } from 'react-toastify';

export default function PriceView({ auction, context }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const loadingAuction = useSelector((state) => state.auction.loadingAuction);

    const [formData, setFormData] = useState({
        address: '',
        deliveryMethod: '',
        problem: '',
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };


    const executeSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        setIsSubmitting(true);

        let base64Image = '';
        try {

            const finalData = {
                ...formData
            };

            if (auction?.id) {
                await dispatch(modifyAuction(finalData));
                toast.success('Subasta Modificada Exitosamente', { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });
            } else {
                await dispatch(createAuction(finalData));
                toast.success('Subasta Agregada Exitosamente', { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });
            }

            setTimeout(() => {
                // router.push('/Product');
            }, 1500);

        } catch (error) {
            console.error("Error al guardar la subasta:", error);
            toast.error('Error al Crear la Subasta', { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleConfirmSubmit = async () => {
        setShowModal(false);
        await executeSubmit();
    };

    if (loadingAuction) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-brand border-e-transparent align-[-0.125em] text-brand" role="status">
                    <span className="sr-only">Cargando subasta...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="items-center justify-center h-screen w-full">
            <section>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-white rounded-lg shadow">
                    <div className="place-content-end">
                        <Link href={`/Price`} className="pt-3 lg:inline-flex mt-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </Link>
                    </div>

                    <h1 className="mb-4 text-2xl font-bold text-gray-900 mb-12">{auction?.id ? ' Reclamar Premio' : 'Registrar Subasta Nueva'}</h1>



                    <div className="flex justify-center mt-4 mb-12">
                        <img
                            src={formData.image}
                            alt="image"
                            className="h-72 w-auto max-w-full object-contain rounded-md border border-gray-300"
                        />
                    </div>


                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            {/* AUCTION INFO */}
                            <div className="sm:col-span-2">
                                <h2 className="text-2xl font-bold text-gray-900"> {auction.name} </h2>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-base font-small text-gray-600 "> {auction.description} </p>
                            </div>

                            <div className="sm:col-span-2">
                                <label className=" text-lg font-medium text-gray-900"> Precio Base : </label>
                                <label className=" text-lg font-sm text-gray-900"> {auction.basePrice} </label>
                            </div>
                            <div className="sm:col-span-2">
                                <label className=" text-lg font-medium text-gray-900"> Precio Final : </label>
                                <label className=" text-lg font-sm text-gray-900"> {auction.basePrice} </label>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-base font-small text-gray-600 "> {auction.conditions} </p>
                            </div>

                            <hr className="mt-6 md:mt-8 border-gray-200 sm:col-span-2 mb-4" />
                            {/* PRODUCT INFO */}
                            <div className="sm:col-span-2">
                                <h2 className="text-2xl font-bold text-gray-900"> nombre{/*product.name*/} </h2>
                            </div>
                            <div className="sm:col-span-2">

                                <label className=" text-lg font-medium text-gray-900"> categoria{/*auction.category*/} </label>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-base font-small text-gray-600 "> descripcion de producto{/*product.description*/} </p>
                            </div>

                            <hr className="mt-6 md:mt-8 border-gray-200 sm:col-span-2 mb-4" />

                        </div>

                        {context === "claim" && (
                            <div className="">
                                <div className="sm:col-span-2 mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900"> Detalles de Envio </h2>
                                </div>
                                <div className="w-full mb-6">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Direccion</label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Ingrese la direccion"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full mb-6">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Metodo</label>
                                    <input
                                        type="text"
                                        name="deliveryMethod"
                                        id="deliveryMethod"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Ingrese el Metodo de Envio "
                                        required
                                        value={formData.deliveryMethod}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        {context === "report" && (

                            <div>
                                <div className="sm:col-span-2 mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900"> Detalles de Reclamo </h2>
                                </div>
                                <div className="sm:col-span-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="8"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                        placeholder="Ingresa una descripción del problema presentado"
                                        required
                                        value={formData.problem}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-brand rounded-lg focus:ring-4 focus:ring-primary-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : `${context === "claim" ? 'Reclamar' : 'Reportar'}`}
                        </button>

                        {showModal && (
                            <ConfirmationModal
                                onCancel={() => setShowModal(false)}
                                onConfirm={handleConfirmSubmit}
                                message={"¿Estás seguro de que deseas continuar?"}
                            />
                        )}
                    </form>
                </div>
            </section >
            <ToastContainer />
        </div >
    );
}