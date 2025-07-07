"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from "../../../lib/features/product/productSlice";
import ProductView from "../../components/Product/ProductView";
import { useParams } from "next/navigation";
import { useAuth } from '../../../lib/contexts/auth';

export default function Manage() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;
  const { token, userId } = useAuth();
  const currentProduct = useSelector((state) => state.product.currentProduct);


  useEffect(() => {
    if (token && userId) {
      dispatch(fetchProduct({
        productId: id,
        token: token,
        userId: userId
      }));

    } else {
      console.warn("Token o userId no disponibles.");
    }
  }, [dispatch, token, userId]);

  return <ProductView product={currentProduct} />;
}
