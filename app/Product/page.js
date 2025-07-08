"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/Product/ProductCard";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories, deleteProduct } from "../../lib/features/product/productSlice";
import { ToastContainer, toast } from 'react-toastify';
import SearchBar from '../components/SearchBar';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAuth } from '../../lib/contexts/auth';



export default function Product() {
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.product.categories);
  const loading = useSelector((state) => state.product.loadingProducts);
  const dispatch = useDispatch();
  const [productsList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productsList.length / productsPerPage);



  useEffect(() => {
    dispatch(fetchProducts());
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

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      setLoadingDelete(true);
      try {
        await dispatch(deleteProduct({
          productId: productToDelete.productId,
        })).unwrap();


        toast.success('Producto eliminado correctamente', {
          position: "bottom-right",
          className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700',
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
      } catch (error) {
        toast.error('No se pudo eliminar el producto', {
          position: "bottom-right",
          className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-red-100 text-red-700',
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
      }
      setLoadingDelete(false);
      setShowModal(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-brand border-e-transparent align-[-0.125em] text-brand" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    );
  }

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
            loading={loadingDelete}
          >
            {loadingDelete ? (
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-red-600" role="status">
                <span className="sr-only">Eliminando...</span>
              </div>
            ) : "Eliminar"}
          </ConfirmationModal>
        )}

        <ToastContainer />
      </div>
    </section>
  );
}
