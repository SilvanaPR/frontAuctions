'use client';

import { useState } from 'react';
import {
    useStripe,
    useElements,
    CardElement
} from '@stripe/react-stripe-js';
import { saveCard } from '@/lib/features/payment/paymentSlice';
import { useDispatch } from 'react-redux';

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setMessage("❌ No se encontró el campo de tarjeta.");
            return;
        }

        setLoading(true);

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email
            }
        });


        if (error) {
            setMessage("❌ " + error.message);
            setLoading(false);
            return;
        }

        const pm = paymentMethod;
        const card = pm.card;

        if (!card) {
            setMessage("❌ No se pudo obtener los datos de la tarjeta.");
            setLoading(false);
            return;
        }

        const dto = {
            cardId: '',
            cardLastDigits: card.last4,
            cardExpirationDate: new Date(card.exp_year, card.exp_month - 1, 1),
            CardBrand: card.brand || "unknown",
            isDefault: isDefault,
            cardIdstripe: pm.id
        };


        try {
            dispatch(saveCard(dto));

            if (response.ok) {
                setMessage("✅ Tarjeta guardada correctamente.");
            } else {
                const errorData = await response.json();
                setMessage("❌ Error: " + errorData.message);
            }
        } catch (err) {
            setMessage("❌ Error al conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded shadow-sm bg-white">
                <h2 className="text-xl font-bold text-center">Guardar tarjeta</h2>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="border p-2 w-full rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="border p-3 rounded">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Datos de la tarjeta</label>
                    <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                </div>

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isDefault}
                        onChange={(e) => setIsDefault(e.target.checked)}
                    />
                    <span>¿Establecer como tarjeta predeterminada?</span>
                </label>

                <button
                    type="submit"
                    className="w-full text-white bg-brand hover:bg-brandLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled={loading}
                >
                    {loading ? "Guardando..." : "Guardar Tarjeta"}
                </button>

                {message && <p className="text-sm mt-2 text-center">{message}</p>}
            </form>

        </>
    );
}
