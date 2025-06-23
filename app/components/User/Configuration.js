"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from "../../lib/features/user/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import ConfirmationModal from '../components/ConfirmationModal';
import ImageReader from "../components/ImageReader";


export default function UserConfiguration(props) {
    const user = useSelector((state) => state.product.products);
    const dispatch = useDispatch();
    const [imageFileBase64, setImageFileBase64] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tipo: '',
        password: '',
        phone: '',
        address: '',
        lastName: '',
    });

    useEffect(() => {
        console.log(p0rops)
        if (id) {
            dispatch(fetchUser(props.userId));
        }
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
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

    const confirmDelete = (product) => {
        setProductToDelete(product);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            dispatch(deleteProduct(productToDelete));
            toast.success('Producto eliminado correctamente', {
                position: "bottom-right",
                className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700',
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            });
        }
        setShowModal(false);
        setProductToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setProductToDelete(null);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        try {
            setIsSubmitting(true);

            // Aquí deberías colocar tu lógica de actualización real (por ejemplo, dispatch(updateUser(formData)))
            await new Promise((res) => setTimeout(res, 1200)); // simulación

            toast.success("Cambios guardados correctamente", {
                position: "bottom-right",
                className:
                    "text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700",
            });

            setIsEditing(false);
        } catch (err) {
            toast.error("Error al guardar los cambios");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (

        <div className="items-center justify-center h-screen w-full">
            <form onSubmit={handleSubmit}>
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-white rounded-lg shadow grid gap-4 sm:grid-cols-2 sm:gap-6">

                    <div className="sm:col-span-2 group mb-4">
                        <img className="rounded-sm w-36 h-36 mb-8" src={user.image} ></img>
                    </div>

                    {/* NAME */}
                    <div className="w-full mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    {/* LAST NAME */}
                    <div className="w-full mb-4">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Apellido</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="sm:col-span-2 mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="relative z-0 w-full mb-5 group mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder=" "
                            required
                            value={formData.password}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* PHONE */}
                    <div className="w-full mb-4">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* ADRESS */}
                    <div className="sm:col-span-2 group mb-4">
                        <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900">Dirección</label>
                        <textarea
                            id="adress"
                            name="adress"
                            rows="8"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            required
                            value={formData.adress}
                            onChange={handleChange}
                            disabled={!isEditing}
                        ></textarea>
                    </div>


                    <div className="sm:col-span-2 group mb-4">
                        <button
                            type="submit"
                            className={`inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-base font-medium text-white bg-brand rounded-lg focus:ring-4 focus:ring-primary-200 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : 'Modificar Usuario'}
                        </button>
                    </div>
                </div >
            </form >
            <ToastContainer />
        </div >

    );
}
