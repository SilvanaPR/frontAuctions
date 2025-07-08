"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addAuction, modifyAuction } from "../../../lib/features/auction/auctionSlice";
import { fetchProducts } from "../../../lib/features/product/productSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Datepicker } from 'flowbite';
import ConfirmationModal from "../ConfirmationModal";
import { ToastContainer, toast } from 'react-toastify';

export default function AuctionBid(props) {
    const [imageFileBase64, setImageFileBase64] = useState('');
    const [imageFileRaw, setImageFileRaw] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const datepickerRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const products = useSelector((state) => state.product.products);
    const [preview, setPreview] = useState(null);
    const loadingAuction = useSelector((state) => state.auction.loadingAuction);

    const [formData, setFormData] = useState({
        name: '',
        basePrice: '',
        description: '',
        product: '',
        initDate: '',
        endDate: '',
        conditions: '',
        minIncrement: '',
        resPrice: '',
        initHour: '00:00',
        endHour: '00:00',
    });

    useEffect(() => {
        console.log(props);
        dispatch(fetchProducts());
    }, [dispatch]);

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
            const prod = products.find(p => p.productId === props.auction.product);
            setSelectedProduct(prod || null);
            if (prod && prod.productImage) {
                setPreview(prod.productImage);
            } else {
                setPreview(null);
            }
        }
    }, [props.auction, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleProductChange = (e) => {
        const selectedId = e.target.value;
        const productObject = products.find(prod => prod.productId === selectedId);
        setSelectedProduct(productObject);
        setFormData(prev => ({
            ...prev,
            product: productObject ? productObject.productId : '',
        }));
        handleImageChange(productObject);
    };

    const handleImageChange = (product) => {
        if (product && product.productImage) {
            setPreview(product.productImage);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
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

            const finalData = {
                ...formData
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



            <section class="py-8 bg-white md:py-16 antialiased">
                <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">

                    <div className="place-content-end">
                        <Link href={`/AuctionClient`} className="pt-3 lg:inline-flex mt-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </Link>
                    </div>
                    <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">



                        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
                            <img className=" w-full " src={props.auction?.image} />
                        </div>

                        <div class="mt-6 sm:mt-8 lg:mt-0">
                            <h1
                                class="text-xl font-semibold text-gray-900 sm:text-2xl mb-4"
                            >
                                {props.auction?.name}
                            </h1>
                            <div className="mb-4">
                                <p className="text-m text-gray-900 sm:text-lg">Cantidad</p>
                                <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                    {props.auction?.productStock}
                                </p>
                            </div>

                            <div>
                                <p class="mb-6 text-gray-500 ">
                                    {props.auction?.description}
                                </p>
                            </div>

                            <div>
                                <p class="mb-6 text-gray-500 ">
                                    {props.auction?.conditions}
                                </p>
                            </div>

                            <div className="flex gap-10 mb-4">
                                <div className="flex flex-col items-center">
                                    <p className="text-m text-gray-900 sm:text-lg">Precio Base</p>
                                    <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                        {props.auction?.basePrice}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <p className="text-m text-gray-900 sm:text-lg">Incremento Minimo</p>
                                    <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                                        {props.auction?.minIncrement}
                                    </p>
                                </div>
                            </div>



                            <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <a
                                    href="#"
                                    title=""
                                    class="text-white mt-4 sm:mt-0 bg-brand hover:bg-brandLight focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center"
                                    role="button"
                                >

                                    Puja Manual
                                </a>

                                <a
                                    href="#"
                                    title=""
                                    class="text-white mt-4 sm:mt-0 bg-brand hover:bg-brandLight focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center"
                                    role="button"
                                >

                                    Puja Automatica
                                </a>
                            </div>

                            <hr class="my-6 md:my-8 border-gray-200 " />
                            <div className="mb-4 flex gap-10">
                                <label className="text-lg text-gray-900 sm:text-xl">
                                    Fecha de Inicio

                                    <p className="text-base font-bold text-gray-900">
                                        {`${new Date(props.auction.initDate).toLocaleDateString()} ${props.auction.initHour}`}

                                    </p>

                                </label>

                                <label className="text-lg text-gray-900 sm:text-xl">
                                    Fecha Fin

                                    <p className="text-base font-bold text-gray-900">
                                        {`${new Date(props.auction.endDate).toLocaleDateString()} ${props.auction.endHour}`}

                                    </p>

                                </label>
                            </div>

                        </div>
                    </div>
                </div >
            </section >
        </div>


    );
}