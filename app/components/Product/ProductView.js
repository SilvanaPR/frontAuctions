"use client";
import React, { useState, useEffect } from "react";
import ImageReader from "../ImageReader";
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct, fetchCategories, fetchProduct } from "../../../lib/features/product/productSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import ConfirmationModal from '../ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../../lib/contexts/auth';


export default function ProductView(props) {
  const [imageFileBase64, setImageFileBase64] = useState('');
  const [imageFileRaw, setImageFileRaw] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const loadingProduct = useSelector((state) => state.product.loadingProduct);
  const { token, userId } = useAuth();


  useEffect(() => {
    dispatch(fetchCategories(token));
  }, [dispatch]);

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productImage: '',
    productPrice: '',
    productDescription: '',
    productAvilability: 'Disponible',
    productStock: '',
    categoryId: '',
    productUserId: '7671574c-6fb8-43b7-98be-897a98c487a0'
  });

  useEffect(() => {
    dispatch(fetchCategories());
    if (props.product?.productId) {
      setFormData(props.product);
      const categoryObject = categories.find(cat => cat.id === props.product.categoryId);
      setSelectedCategory(categoryObject);
      setImageFileBase64(props.product.productImage);
    }
  }, [props.product, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const convertToBase64 = () => {
    return new Promise((resolve, reject) => {
      if (!imageFileRaw) {
        resolve('');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(imageFileRaw);
      reader.onload = () => {
        handleChange({ target: { name: "productImage", value: reader.result } });
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const categoryObject = categories.find(cat => cat.id === selectedId);
    setSelectedCategory(categoryObject);
    setFormData(prev => ({
      ...prev,
      categoryId: categoryObject ? categoryObject.id : '',
    }));
  };

  const handleImageChange = (file) => {
    setImageFileRaw(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFileBase64(reader.result);
        setFormData(prev => ({
          ...prev,
          productImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImageFileBase64('');
      setFormData(prev => ({
        ...prev,
        productImage: ''
      }));
    }
  };


  const executeSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitting(true);

    if (!selectedCategory) {
      setIsSubmitting(false);
      toast.error('Por favor selecciona una categoría', { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
      return;
    }

    let base64Image = '';
    try {
      base64Image = await convertToBase64();

      if (!base64Image && !formData.productImage && !props.product?.productImage) {
        setIsSubmitting(false);
        toast.error('Por Favor Selecciona una Imagen', { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
        return;
      }

      const finalFormData = {
        ...formData,
        categoryId: selectedCategory.id,
        productImage: base64Image || formData.productImage || props.product?.productImage || ''
      };
      console.log(finalFormData);

      let result;
      if (props.product?.productId) {
        result = await dispatch(updateProduct(finalFormData));
        if (result.error) throw new Error(result.error.message || "Error al modificar el producto");
        toast.success('Producto Modificado Exitosamente', { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });
      } else {
        result = await dispatch(createProduct(finalFormData));
        if (result.error) throw new Error(result.error.message || "Error al crear el producto");
        toast.success('Producto Creado Exitosamente', { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });
      }

      setTimeout(() => {
        router.push('/Product');
      }, 1500);

    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error('Error al Guardar el Producto', { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmSubmit = async () => {
    setShowModal(false);
    await executeSubmit();
  };

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-brand border-e-transparent align-[-0.125em] text-brand" role="status">
          <span className="sr-only">Cargando producto...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="items-center justify-center h-screen w-full">
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-white rounded-lg shadow">
          {/* RETURN BUTTON */}
          <div className="place-content-end">
            <Link href={`/Product`} className="pt-3 lg:inline-flex mt-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            </Link>
          </div>

          <h2 className="mb-4 text-xl font-bold text-gray-900">{props.product?.productId ? 'Modificar Producto' : 'Registrar Producto Nuevo'}</h2>

          <form onSubmit={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              {/* NAME */}
              <div className="w-full">
                <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900">Nombre del Producto</label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ingrese nombre del producto"
                  required
                  value={formData.productName}
                  onChange={handleChange}
                />
              </div>
              {/* STOCK */}
              <div className="w-full">
                <label htmlFor="productStock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                <input
                  type="number"
                  name="productStock"
                  id="productStock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="15"
                  required
                  value={formData.productStock}
                  onChange={handleChange}
                />
              </div>
              {/* CATEGORY */}
              <div>
                <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900">Categoría</label>
                <select
                  id="categoryId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  name="categoryId"
                  value={selectedCategory?.id || ''}
                  onChange={handleCategoryChange}
                  required
                >
                  <option key="default" value="">Seleccione una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* PRICE */}
              <div className="w-full">
                <label htmlFor="productPrice" className="block mb-2 text-sm font-medium text-gray-900">Precio</label>
                <input
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="$100.00"
                  required
                  value={formData.productPrice}
                  onChange={handleChange}
                />
              </div>
              {/* DESCRIPTION */}
              <div className="sm:col-span-2">
                <label htmlFor="productDescription" className="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                  placeholder="Ingresa una descripción del producto"
                  required
                  value={formData.productDescription}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* IMAGE */}
              <div className="sm:col-span-2">
                <label htmlFor="productImage" className="block mb-2 text-sm font-medium text-gray-900">Cargar Imagen</label>
                <ImageReader onImageChange={handleImageChange} imagePreview={imageFileBase64} />
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className={`inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-brand rounded-lg focus:ring-4 focus:ring-primary-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : `${props.product ? 'Modificar' : 'Agregar'} Producto`}
            </button>

            {showModal && (
              <ConfirmationModal
                onCancel={() => setShowModal(false)}
                onConfirm={handleConfirmSubmit}
                message={"¿Estás seguro de que deseas continuar?"}
              />
            )}
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}