"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getCategories } from "../../lib/features/product/productSlice";
import { ToastContainer, toast } from 'react-toastify';

export default function Product() {
  const products = useSelector((state) => state.product.products)
  const categories = useSelector((state) => state.product.categories)
  const dispatch = useDispatch()
  const notify = () => toast('Wow so easy !');

  const [productsList, setProductList] = useState([])

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
  }, []);

  useEffect(() => {
    setProductList(products.map((el) => { return { ...el, category_name: categories.find(i => i.id == el.category)?.name } }))
  }, [products]);

  return (
    <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                Flowbite   

                <img className="w-8 h-8 mr-2" src="/clickbidBanner.jpg" alt="logo" /> 
            </a>
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Inicio de Sesión
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="usuario@gmail.com" required=""/>
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                        </div>
                        <div className="flex items-center justify-between">
                            
                            <a href="#" className="text-sm font-medium text-brand hover:underline">Olvidaste tu contraseña?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-brand hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar sesión</button>
                        <p className="text-sm font-light text-gray-500">
                            No tienes una cuenta? <a href="#" className="font-medium text-brand hover:underline">Registrate</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
}