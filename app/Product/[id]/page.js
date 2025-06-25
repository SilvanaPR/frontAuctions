"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from "../../../lib/features/product/productSlice";
import ProductView from "../../components/Product/ProductView";
import { useParams } from "next/navigation";

export default function Manage() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;

  const currentProduct = useSelector((state) => state.product.currentProduct);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
      console.log(currentProduct);
    }
  }, [dispatch, id]);

  return <ProductView product={currentProduct} />;
}
