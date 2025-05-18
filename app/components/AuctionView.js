"use client";
import React, { useState, useEffect } from "react";
import ImageReader from "./ImageReader";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, getCategories, modifyProduct } from "../../lib/features/auction/auctionSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import NotificationCard from "../components/NotificationCard";
import { Datepicker } from 'flowbite';

export default function AuctionView(props) {
    const [imageFileBase64, setImageFileBase64] = useState('');
    const [imageFileRaw, setImageFileRaw] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        basePrice: '',
        description: '',
        image: '',
        initDate: '',
        endDate: '',
        conditions: '',
        minIncrement: '',
        resPrice: ''
    });


    // useEffect(() => {
    //     const datepickerEl = document.getElementById('datepicker-input');
    //     new Datepicker(datepickerEl);
    // }, []);


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
        console.log("hols ")
        /*
        event.preventDefault();
        setIsSubmitting(true);
        setNotification(null);
 
        if (!selectedCategory) {
            setIsSubmitting(false);
            return;
        }
 
        let base64Image = '';
        try {
            base64Image = await convertToBase64();
            if (base64Image === '' && !formData.image && !props.product?.image) {
                setIsSubmitting(false);
                setNotification({ title: "Error", text: "Por favor, carga una imagen", type: "danger" });
                return;
            }
 
            const finalFormData = { ...formData, category: selectedCategory.id };
 
            if (props.product?.id) {
                await dispatch(modifyProduct(finalFormData));
                console.log("Producto modificado:", finalFormData);
                setNotification({ title: "Éxito", text: "Producto modificado exitosamente", type: "success" });
            } else {
                await dispatch(addProduct(finalFormData));
                console.log("Producto agregado:", finalFormData);
                setNotification({ title: "Éxito", text: "Producto agregado exitosamente", type: "success" });
            }
 
 
            setTimeout(() => {
                //router.push('/Product');
            }, 1500);
 
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            setNotification({ title: "Error", text: "Hubo un error al guardar el producto.", type: "danger" });
        } finally {
            setIsSubmitting(false);
        }
            */
    };
    /*
        const handleCategoryChange = (e) => {
            const selectedId = parseInt(e.target.value);
            const categoryObject = categories.find(cat => cat.id === selectedId);
            setSelectedCategory(categoryObject);
            setFormData(prev => ({
                ...prev,
                category: categoryObject ? categoryObject.id : '',
            }));
        };
    */

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

                    {notification && (
                        <NotificationCard title={notification.title} text={notification.text} type={notification.type} />
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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

                            <div className="relative max-w-sm">
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
                                <input datepicker="true" id="default-datepicker" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Select date" />

                            </div>


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
                            {isSubmitting ? 'Guardando...' : `${props.auctions ? 'Modificar' : 'Agregar'} Subasta`}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}