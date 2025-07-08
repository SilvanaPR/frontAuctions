"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from "../../../lib/features/product/productSlice";
import ConfirmationModal from '../ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductView(props) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    holder: '',
    cardNumber: '',
    cvv: '',
  });


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

    try {
      console.log(formData);
      //await dispatch(createProduct(formData));
      toast.success('Tarjeta Creada Exitosamente', { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });


    } catch (error) {
      console.error("Error al guardar la tarjeta:", error);
      toast.error('Error al Guardar la tarjeta', { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
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

          <h2 className="mb-8 text-xl font-bold text-gray-900">Registrar Tarjeta Nueva</h2>

          <form onSubmit={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              {/* NAME */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre de Tarjeta</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ingrese nombre de la tarjeta"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* HOLDER */}
              <div className="sm:col-span-2">
                <label htmlFor="holder" className="block mb-2 text-sm font-medium text-gray-900">Nombre del Titular</label>
                <input
                  type="text"
                  name="holder"
                  id="holder"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ingrese nombre del titular"
                  required
                  value={formData.holder}
                  onChange={handleChange}
                />
              </div>

              {/* CARD */}
              <div className="sm:col-span-2">
                <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-900">Numero de Tarjeta</label>
                <input
                  type="number"
                  name="cardNumber"
                  id="cardNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ingrese el numero de tarjeta"
                  required
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </div>

              {/* CVV */}
              <div className="sm:col-span-2">
                <label htmlFor="cvv" className="block mb-2 text-sm font-medium text-gray-900">CVV</label>
                <input
                  type="number"
                  name="cvv"
                  id="cvv"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ingrese el numero de la parte de atras de la tarjeta"
                  required
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>

            </div>
            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className={`inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-brand rounded-lg focus:ring-4 focus:ring-primary-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : `Agregar Tarjeta`}
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