"use client";
import React from "react";
import ProductList from "./Product/page";
import Login from "./Login/page"
import StoreProvider from "./StoreProvider";
import { ToastContainer, toast } from 'react-toastify';



if (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_SECRET_KEY is not set');
}

/*
export default function Home() {
  return (
    <>
      <ProductList />
      <ToastContainer />
    </>
  );
}
*/

import { useAuth } from "@/lib/contexts/auth";

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {!isAuthenticated ? (
        <button onClick={() => console.log(login)} className="bg-blue-600 text-white px-6 py-2 rounded-md">
          Signin with keycloak
        </button>
      ) : (
        <div className="text-center">
          <div>{user?.name}</div>
          <div>{user?.email}</div>
          <button className="mt-5 bg-red-600 text-white px-6 py-2" onClick={() => logout()}>Logout</button>
        </div>
      )}
    </main>
  );
}