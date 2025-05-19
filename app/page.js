import React from "react";
import 'react-notifications/lib/notifications.css';
import ProductList from "./Product/page";
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