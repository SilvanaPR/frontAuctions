"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/Product/ProductCard";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories, deleteProduct } from "../../lib/features/product/productSlice";
import { ToastContainer, toast } from 'react-toastify';
import SearchBar from '../components/SearchBar';
import ConfirmationModal from '../components/ConfirmationModal';

export default function Product() {
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.product.categories);
  const dispatch = useDispatch();
  const [productsList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productsList.length / productsPerPage);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setProductList(products.map((el) => ({
      ...el,
      category_name: categories.find(i => i.id == el.categoryId)?.name
    })));
  }, [products, categories]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete));
      toast.success('Producto eliminado correctamente', {
        position: "bottom-right",
        className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700',
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    }
    setShowModal(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  return (
    <section className="bg-gray-50 py-8 antialiased md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-8">
          <SearchBar categories={["Todos", "Nombre", "Categoría", "Precio"]} />
        </div>

        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {productsList.map((product) => (
            <ProductCard key={product.productId} product={product} onDeleteClick={() => confirmDelete(product)} />
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 rounded-md text-sm font-medium border 
                ${currentPage === number ? 'bg-brand text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              {number}
            </button>
          ))}
        </div>

        {showModal && (
          <ConfirmationModal
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            message={"¿Estás seguro de eliminar este producto?"}
          />
        )}

        <ToastContainer />
      </div>
    </section>
  );
}
