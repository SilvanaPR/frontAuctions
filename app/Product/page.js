"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getCategories } from "../../lib/features/product/productSlice";

export default function Product() {
  const products = useSelector((state) => state.product.products)
  const categories = useSelector((state) => state.product.categories)
  const dispatch = useDispatch()

  const [productsList, setProductList] = useState([])

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
  }, []);

  useEffect(() => {
    setProductList(products.map((el) => { return { ...el, category_name: categories.find(i => i.id == el.category)?.name } }))
  }, [products]);


  console.log(productsList)
  return (
    <section className="bg-gray-50 py-8 antialiased md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {productsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}