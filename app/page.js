"use client";
import React from "react";
import ProductList from "./Product/page";
import Login from "./Login/page"
import StoreProvider from "./StoreProvider";
import { ToastContainer, toast } from 'react-toastify';



if (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_SECRET_KEY is not set');
}

export default function Home() {
  return (
    <>
      <ProductList />
      <ToastContainer />
    </>
  );
}
