'use client';
import React from 'react';
import { useState } from 'react';

export default function PaymentModal({ onClose, message }) {
    const [paymentMethod, setPaymentMethod] = useState(null);

    const paymentMethods = [
        {
            id: 1,
            name: "Tarjeta de credito",
            description: "Paga con tu tarjeta de credito",
        },
        {
            id: 2,
            name: "Tarjeta de debito",
            description: "Paga con tu tarjeta de debito",
        },
        {
            id: 3,
            name: "Transferencia bancaria",
            description: "Paga con tu transferencia bancaria",
        },
    ];
    const handlePayment = (selectedId) => {
        console.log("Pagar");
        console.log("Método de pago seleccionado:", selectedId);
        // Aquí puedes enviar el id al backend o hacer lo que necesites
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">

                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">&times;</button>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-8">{message}</h1>
                <ul className="grid w-full gap-6 md:grid-cols-3">
                    {paymentMethods.map((method) => (
                    <li key={method.id}>
                        <input
                            type="radio"
                            id={`payment-${method.id}`}
                            name="paymentMethod"
                            value={method.id}
                            className="hidden peer"
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                        />
                        <label
                            htmlFor={`payment-${method.id}`}
                            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div className="block">
                                <div className="w-full text-lg font-semibold">{method.name}</div>
                                <div className="w-full text-sm">{method.description}</div>
                            </div>
                        </label>
                    </li>
                    ))}
                </ul>
                <button
                    type="submit"
                    className="my-6 w-full text-white bg-brand hover:bg-brandLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handlePayment(paymentMethod)}
                    disabled={paymentMethod === null}
                >
                    Pagar
                </button>
            </div>
        </div>
    );
}
