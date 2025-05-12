"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProduct } from "../../../lib/features/product/productSlice";

import ProductView from "../../components/ProductView";

export default function Manage({params}) {
  const dispatch = useDispatch();

  const currentProduct = useSelector((state) => state.product.currentProduct)

  useEffect(() => {
    dispatch(getCurrentProduct(params.id))
  }, []);

  return <ProductView product={currentProduct}/>
}
