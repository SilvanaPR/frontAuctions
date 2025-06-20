'use client';
import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function ChangePasswordModal ({ onClose }) {
    const [formData, setFormData] = useState({
        email: ''
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

        toast.success("Correo enviado correctamente", { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });

        onClose();
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">&times;</button>

                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-8">
                    Reestablecer contraseña
                </h1>
                <form className="space-y-4" onSubmit={(e) => {handleSubmit(e)}}>
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
                    <button type="submit" className="w-full text-white bg-brand hover:bg-brandLight font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Enviar Correo
                    </button>

                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
