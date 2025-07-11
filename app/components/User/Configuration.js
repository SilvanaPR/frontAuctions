"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmationModal from '../ConfirmationModal';
import ImageReader from "../ImageReader";
import { saveUser } from "@/lib/features/user/userSlice";
import { Datepicker } from "flowbite";

export default function Configuration(user) {
    
    const dispatch = useDispatch();
    const [imageFileBase64, setImageFileBase64] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFileRaw, setImageFileRaw] = useState(false);
    const datepickerRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tipo: '',
        phone: '',
        address: '',
        lastName: '',
        image: '',
        dni: '',
        birthday: '',
        password: '',
        specialization: ''
    });


    useEffect(() => {
        if (user) {
            debugger
            setFormData({
                name: user.user.userName || '',
                email: user.user.userEmail || '',
                tipo: user.user.usersType || '',
                phone: user.user.userPhone || '',
                address: user.user.userAddress || '',
                lastName: user.user.userLastName || '',
                image: user.user.image || '',
                dni: user.user.dni || '',
                birthday: user.user.userBirthday || '',
                password: '', // Password is not editable in this form
                specialization: user.user.userSpecialization || '',
                auctioneerDelete: false,
                bidderDelete: false,
                supportDelete: false
            });
        }
    }, [user]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const birthDayEl = document.getElementById("birthDay");
            if (birthDayEl) {
                const datepicker = new Datepicker(birthDayEl);
                const onChange = (event) => {
                    setFormData(prev => ({ ...prev, birthDay: event.target.value }));
                };
                birthDayEl.addEventListener('changeDate', onChange);
                return () => birthDayEl.removeEventListener('changeDate', onChange);
            }
        }
    }, []);

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
                image: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEditing) {
            setIsEditing(true);
            return;
        }
        setShowModal(true);
    };

    function buildUserPayload(formData, userType, isEdit) {
      const base = {
        userEmail: formData.email,
        userName: formData.name,
        userLastName: formData.lastName,
        userPhone: formData.phone,
        userAddress: formData.address,
      };

      if (userType === "Subastador") {
        if (isEdit) {
          return {
            ...base,
            auctioneerDni: formData.dni,
            auctioneerBirthday: formData.birthday,
            auctioneerDelete: false,
          };
        } else {
          return {
            ...base,
            userPassword: formData.password,
            auctioneerDni: formData.dni,
            auctioneerBirthday: formData.birthday,
          };
        }
      } else if (userType === "Postor") {
        if (isEdit) {
          return {
            ...base,
            bidderDni: formData.dni,
            bidderBirthday: formData.birthday,
            bidderDelete: false,
          };
        } else {
          return {
            ...base,
            userPassword: formData.password,
            bidderDni: formData.dni,
            bidderBirthday: formData.birthday,
          };
        }
      } else if (userType === "Soporte") {
        if (isEdit) {
          return {
            ...base,
            supportDni: formData.dni,
            supportSpecialization: formData.specialization,
            supportDelete: false,
          };
        } else {
          return {
            ...base,
            userPassword: formData.password,
            supportDni: formData.dni,
            supportSpecialization: formData.specialization,
          };
        }
      }
      // fallback
      return base;
    }

    const handleConfirmSave = async () => {
        setShowModal(false);
        try {
            setIsSubmitting(true);

            const userType = formData.tipo; // or wherever you store the user type
            const isEdit = isEditing; // or your own logic
            const payload = buildUserPayload(formData, userType, isEdit);
            
            await dispatch(saveUser(payload)); 
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

                    <div className="sm:col-span-2 flex justify-center">
                        <div className="relative group">
                            <img
                                src={formData.image || user.user.image || "/user.png"}
                                alt="avatar"
                                className="w-32 h-32 rounded-full object-cover border shadow border-brand border-4"
                            />

                            {isEditing && (
                                <>
                                    <label
                                        htmlFor="avatar"
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition"
                                        title="Cambiar foto"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z"
                                            />
                                            <circle cx="12" cy="13" r="4" />
                                        </svg>
                                    </label>

                                    <input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e.target.files[0])}
                                        className="hidden"
                                    />
                                </>
                            )}
                        </div>                      
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
                    <div className="w-full mb-4">
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

                    {/* PHONE */}
                    <div className="w-full mb-4">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">DNI</label>
                        <input
                            type="text"
                            name="dni"
                            id="dni"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            value={formData.dni}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Fecha de Nacimiento
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
                                <input name="birthDay"
                                    id="birthDay" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" value={formData.birthDay} onChange={handleChange} placeholder="Selecionar Fecha" required={isEditing} />

                            </div>
                        </label>
                    </div>
                    {/* ADRESS */}
                    <div className="sm:col-span-2 group mb-4">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Dirección</label>
                        <textarea
                            id="address"
                            name="address"
                            rows="8"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            required
                            value={formData.address}
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
                            {isEditing ? 'Guardar Cambios' : 'Modificar Usuario'}
                        </button>
                    </div>
                </div >
            </form >
            {showModal && (
                <ConfirmationModal
                    onCancel={() => setShowModal(false)}
                    onConfirm={handleConfirmSave}
                    message={"¿Estás seguro de guardar los cambios?"}
                    loading={isSubmitting}
                />
            )}
            <ToastContainer />
        </div >

    );
}
