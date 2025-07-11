"use client";
import { useEffect } from 'react';
import StripeProvider from '../../components/Stripe/StripeProvider';
import PaymentForm from '../../components/PaymentForm';
import { useDispatch, useSelector } from 'react-redux';
const { fetchCards } = require('@/lib/features/payment/paymentSlice');

export default function PaymentPage() {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.payment.cards);

    useEffect(() => {
        dispatch(fetchCards());
    }, []);

    return (
        <div className="p-6">
            <StripeProvider>
                <PaymentForm />
            </StripeProvider>
        </div>
    );
}
