'use client';
import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function RegisterModal({ onClose }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        adress: '',
        email: '',
        password: '',
        confirmed_password: '',
        phone_number: '',
        user_type: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if (formData.password !== formData.confirmed_password) {
            toast.error("Las contraseñas no coinciden", { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
            return;
        }
        if (formData.password.length < 8) {
            toast.error("La contraseña debe tener al menos 8 caracteres", { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
            return;
        }
        toast.success("Registro exitoso", { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });

        onClose();
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">&times;</button>

                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-8">
                    Registrate!
                </h1>
                <form className="space-y-4" onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        {/* NAME */}
                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                                type="text" 
                                name="first_name" 
                                id="first_name" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                                placeholder=" " 
                                required 
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                        </div>
                        {/* LAST NAME */}
                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                                type="text" 
                                name="last_name" 
                                id="last_name" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                                placeholder=" " 
                                required 
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido</label>
                        </div>
                    </div>
                    {/* ADDRESS */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            name="adress" 
                            id="adress" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                            placeholder=" " 
                            required
                            value={formData.adress}
                            onChange={handleChange}
                        />
                        <label htmlFor="adress" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dirección</label>
                    </div>
                    {/* EMAIL */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                            placeholder=" " 
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dirección de correo electrónico</label>
                    </div>
                    {/* PASSWORD */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                            placeholder=" " 
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
                    </div>
                    {/* CONFIRMED PASSWORD */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="password" 
                            name="confirmed_password" 
                            id="confirmed_password" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                            placeholder=" " 
                            required
                            value={formData.confirmed_password}
                            onChange={handleChange}
                        />
                        <label htmlFor="confirmed_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar contraseña</label>
                    </div>
                    {/* PHONE NUMBER */}
                    <div className="relative z-0 w-full mb-5 group">
                            <input 
                                type="tel" 
                                pattern="[0-9]{11}" 
                                name="phone_number" 
                                id="phone_number" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" 
                                placeholder=" " 
                                required
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                            <label htmlFor="phone_number" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número de teléfono (4127795032)</label>
                    </div>
                    {/* USER TYPE */}
                    <div className="relative z-0 w-full mb-5 group mt-8">
                            <select id="user_type" name="user_type" value={formData.user_type} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                                <option key="default" value="">Seleccione un tipo de usuario</option>
                                <option value="auctioneer">Subastador</option>
                                <option value="bidder">Postor</option>
                            </select>
                    </div>
                    <button type="submit" className="w-full text-white bg-brand hover:bg-brandLight font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Registrarse
                    </button>

                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
