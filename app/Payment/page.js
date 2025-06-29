"use client";
import React, { useEffect, useState } from "react";
import PaymentView from "../components/Payment/PaymentView";
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SetupForm from '../components/Payment/SetupForm';


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CreatePayment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Cambia la URL y el body según tu backend
    fetch("/api/create-setup-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: {/*...*/},
  };

  if (!clientSecret) {
    return <div>Cargando...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <SetupForm />
    </Elements>
  );
}


