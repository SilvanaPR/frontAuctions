"use client";
import React, { useState, useEffect, useRef } from "react";
import ImageReader from "./ImageReader";
import { useSelector, useDispatch } from 'react-redux';
import { addAuction, modifyAuction } from "../../lib/features/auction/auctionSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Datepicker } from 'flowbite';
import ConfirmationModal from "./ConfirmationModal";
import { ToastContainer, toast } from 'react-toastify';

export default function AuctionView(props) {
    const [imageFileBase64, setImageFileBase64] = useState('');
    const [imageFileRaw, setImageFileRaw] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const datepickerRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        basePrice: '',
        description: '',
        image: '',
        initDate: '',
        endDate: '',
        conditions: '',
        minIncrement: '',
        resPrice: '',
        initHour: '00:00',
        endHour: '00:00',
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const initDateEl = document.getElementById("initdate");
            if (initDateEl) {
                const datepicker = new Datepicker(initDateEl);
                const onChange = (event) => {
                    setFormData(prev => ({ ...prev, initDate: event.target.value }));
                };
                initDateEl.addEventListener('changeDate', onChange);
                return () => initDateEl.removeEventListener('changeDate', onChange);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const endDateEl = document.getElementById("endDate");
            if (endDateEl) {
                const datepicker = new Datepicker(endDateEl);
                const onChange = (event) => {
                    setFormData(prev => ({ ...prev, endDate: event.target.value }));
                };
                endDateEl.addEventListener('changeDate', onChange);
                return () => endDateEl.removeEventListener('changeDate', onChange);
            }
        }
    }, []);

    useEffect(() => {
        console.log(props.auction)
        if (props.auction?.id) {
            setFormData(props.auction);
            setImageFileBase64(props.auction.image);
        }
    }, [props.auction, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const convertToBase64 = () => {
        return new Promise((resolve, reject) => {
            if (!imageFileRaw) {
                resolve('');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(imageFileRaw);
            reader.onload = () => {
                handleChange({ target: { name: "image", value: reader.result } });
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const base64Image = await convertToBase64();
            if (!base64Image && !formData.image && !props.auction?.image) {
                setIsSubmitting(false);
                toast.error('Por Favor Selecciona una Imagen', { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
                return;
            }

            const finalData = {
                ...formData,
                image: base64Image || formData.image || props.auction?.image || ''
            };

            if (props.auction?.id) {
                await dispatch(modifyAuction(finalData));
                console.log("Subasta modificada exitosamente:", finalData);
                toast.success('Subasta Modificada Exitosamente', { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });
            } else {
                await dispatch(addAuction(finalData));
                console.log("Subasta agregada exitosamente:", finalData);
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

    
  const executeSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitting(true);

    let base64Image = '';
    try {
            const base64Image = await convertToBase64();
            if (!base64Image && !formData.image && !props.auction?.image) {
                setIsSubmitting(false);
                toast.error('Por Favor Selecciona una Imagen', { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
                return;
            }

            const finalData = {
                ...formData,
                image: base64Image || formData.image || props.auction?.image || ''
            };

            if (props.auction?.id) {
                await dispatch(modifyAuction(finalData));
                console.log("Subasta modificada exitosamente:", finalData);
                toast.success('Subasta Modificada Exitosamente', { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });
            } else {
                await dispatch(addAuction(finalData));
                console.log("Subasta agregada exitosamente:", finalData);
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

    const handleImageChange = (file) => {
        setImageFileRaw(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFileBase64(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFileBase64('');
        }
    };
    
    const handleConfirmSubmit = async () => {
        setShowModal(false);
        await executeSubmit();
    };

    return (
        <div className="items-center justify-center h-screen w-full">
            <section>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-white rounded-lg shadow">
                    <div className="place-content-end">
                        <Link href={`/Auction`} className="pt-3 lg:inline-flex mt-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </Link>
                    </div>

                    <h2 className="mb-4 text-xl font-bold text-gray-900">{props.auction?.id ? 'Modificar Subasta' : 'Registrar Subasta Nueva'}</h2>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            {/* NAME */}
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre de la Subasta</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Ingrese nombre de la subasta"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* BASE PRICE */}
                            <div className="w-full">
                                <label htmlFor="basePrice" className="block mb-2 text-sm font-medium text-gray-900">Precio Base</label>
                                <input
                                    type="number"
                                    name="basePrice"
                                    id="basePrice"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="$100.00"
                                    required
                                    value={formData.basePrice}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* MIN INCREMENT */}
                            <div className="w-full">
                                <label htmlFor="minIncrement" className="block mb-2 text-sm font-medium text-gray-900">Incremento Minimo</label>
                                <input
                                    type="number"
                                    name="minIncrement"
                                    id="minIncrement"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="$10.00"
                                    required
                                    value={formData.minIncrement}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* RES PRICE */}
                            <div className="w-full">
                                <label htmlFor="resPrice" className="block mb-2 text-sm font-medium text-gray-900">Precio de Reserva</label>
                                <input
                                    type="number"
                                    name="resPrice"
                                    id="resPrice"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="$10.00"
                                    required
                                    value={formData.resPrice}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* START DATE */}
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Fecha de Inicio
                                    <div className="relative max-w-sm mt-2.5">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input ref={datepickerRef} name="initdate"
                                            id="initdate" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" value={formData.initDate} onChange={handleChange} placeholder="Selecionar Fecha" required />

                                    </div>
                                </label>
                            </div>
                            {/* START HOUR */}
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Hora de Incio
                                    <div className="relative mt-2.5">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="time" id="initHour" name="initHour" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.initHour} onChange={handleChange} required />
                                    </div>

                                </label>
                            </div>
                            {/* START DATE */}
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Fecha de Cierre
                                    <div className="relative max-w-sm mt-2.5">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input name="endDate"
                                            id="endDate" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" value={formData.endDate} onChange={handleChange} placeholder="Selecionar Fecha" required />

                                    </div>
                                </label>
                            </div>
                            {/* START HOUR */}
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Hora de Incio
                                    <div className="relative mt-2.5">
                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="time" id="endHour" name="endHour" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.endHour} onChange={handleChange} required />
                                    </div>

                                </label>
                            </div>
                            {/* DECRIPTION */}
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="8"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                    placeholder="Ingresa una descripción de la subasta"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            {/* CONDITION */}
                            <div className="sm:col-span-2">
                                <label htmlFor="conditions" className="block mb-2 text-sm font-medium text-gray-900">Condiciones</label>
                                <textarea
                                    id="conditions"
                                    name="conditions"
                                    rows="8"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                    placeholder="Ingresa una descripción de la subasta"
                                    required
                                    value={formData.conditions}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            {/* IMAGE */}
                            <div className="sm:col-span-2">
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Cargar Imagen</label>
                                <ImageReader onImageChange={handleImageChange} imagePreview={imageFileBase64} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-brand rounded-lg focus:ring-4 focus:ring-primary-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : `${props.auction ? 'Modificar' : 'Agregar'} Subasta`}
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
            </section>
            <ToastContainer />
        </div>
    );
}