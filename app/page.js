import React from "react";
import ProductList from "./Product/page";
import Login from "./Login/page"
import StoreProvider from "./StoreProvider";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  return (
    <>
      <ProductList />
      <ToastContainer />
    </>
  );
}