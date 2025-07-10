'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ImageReader from '../ImageReader'
import ConfirmationModal from '../ConfirmationModal';

export default function ClaimModal({ onClose, context, claim }) {
    const [imageFileRaw, setImageFileRaw] = useState(null);
    const [imageFileBase64, setImageFileBase64] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (claim) {
            setFormData(prev => ({
                ...prev,
                reason: claim.reason || '',
                description: claim.description || '',
                image: claim.evidence || '',
            }));
            setImageFileBase64(claim.evidence || '');
        }
    }, [claim]);

    const [formData, setFormData] = useState({
        reason: '',
        description: '',
        auctionId: '',
        image: '',
        response: ''
    });

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
                handleChange({ target: { name: "productImage", value: reader.result } });
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const submitClaim = async () => {
        setIsSubmitting(true);
        let base64Image = '';
        try {
            base64Image = await convertToBase64();

            if (!base64Image && !formData.image) {
                setIsSubmitting(false);
                toast.error('Por Favor Selecciona una Imagen', {
                    className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700',
                    position: "bottom-right"
                });
                return;
            }

            const finalFormData = {
                ...formData,
                image: base64Image || formData.image || '',
            };

            console.log("Datos del reclamo:", finalFormData);


            onClose();
        } catch (error) {
            console.error("Error al crear el reclamo", error);
            toast.error('Error al crear el reclamo', {
                className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700',
                position: "bottom-right"
            });
        } finally {
            setIsSubmitting(false);
            setShowConfirmation(false);
        }
    };

    const handleImageChange = (file) => {
        setImageFileRaw(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFileBase64(reader.result);
                setFormData(prev => ({
                    ...prev,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setImageFileBase64('');
            setFormData(prev => ({
                ...prev,
                image: ''
            }));
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">&times;</button>

                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-8">
                    {context === "create"
                        ? "Presentar Reclamo"
                        : context === "solve"
                            ? "Resolver Reclamo"
                            : "Reclamo"}
                </h1>

                {context !== "create" && formData.image && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={formData.image}
                            alt="image"
                            className="h-40 object-contain rounded-md border border-gray-300"
                        />
                    </div>
                )}



                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    setShowConfirmation(true);
                }}>

                    {/* MOTIVE */}
                    <div className="relative z-0 w-full my-5 group">
                        <input
                            type="text"
                            name="reason"
                            id="reason"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                            placeholder=" "
                            disabled={context !== "create"}
                            required={context === "create"}
                            value={formData.reason}
                            onChange={handleChange}
                        />
                        <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Motivo</label>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="relative z-0 w-full mb-5 group">
                        <textarea
                            name="description"
                            id="description"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                            placeholder=" "
                            disabled={context !== "create"}
                            required={context === "create"}
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripcion</label>

                    </div>

                    {context === "create" && (
                        <ImageReader onImageChange={handleImageChange} imagePreview={imageFileBase64} />
                    )}

                    {/* RESPONSE */}
                    {context === "solve" && (
                        <div className="relative z-0 w-full mb-5 group">
                            <textarea
                                name="response"
                                id="response"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                                placeholder=" "
                                required
                                value={formData.response}
                                onChange={handleChange}
                            />

                            <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Solucion</label>

                        </div>
                    )}

                    {context === "create" || context === "solve" && (
                        <button type="submit" className="w-full text-white bg-brand hover:bg-brandLight font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Enviar
                        </button>
                    )}


                </form>
            </div>
            <ToastContainer />
            {showConfirmation && (
                <ConfirmationModal
                    message="¿Estás seguro de que deseas enviar este reclamo?"
                    onCancel={() => setShowConfirmation(false)}
                    onConfirm={submitClaim}
                    loading={isSubmitting}
                />
            )}

        </div>
    );
}
