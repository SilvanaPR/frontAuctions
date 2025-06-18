"use client";
import React, { useState, useEffect } from "react";
import ImageReader from "./ImageReader";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, modifyProduct, fetchCategories, fetchProduct } from "../../lib/features/product/productSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import ConfirmationModal from './ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductView(props) {
  const [imageFileBase64, setImageFileBase64] = useState('');
  const [imageFileRaw, setImageFileRaw] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    stock: ''
  });

  useEffect(() => {
    dispatch(fetchCategories());
    if (props.product?.id) {
      setFormData(props.product);
      console.log(props.product)
      const categoryObject = categories.find(cat => cat.id === props.product.category);
      setSelectedCategory(categoryObject);
      setImageFileBase64(props.product.image);
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
        handleChange({ target: { name: "image", value: reader.result } });
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
      category: categoryObject ? categoryObject.id : '',
    }));
  };

  const handleImageChange = (file) => {
    setImageFileRaw(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFileBase64(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFileBase64('');
    }
  };


  const executeSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitting(true);

    if (!selectedCategory) {
      setIsSubmitting(false);
      return;
    }

    let base64Image = '';
    try {
      base64Image = await convertToBase64();

      if (!base64Image && !formData.image && !props.product?.image) {
        setIsSubmitting(false);
        toast.error('Por Favor Selecciona una Imagen', { className: 'text-medium py-4 px-6 rounded-md shadow-lg bg-red-100 text-red-700', position: "bottom-right" });
        return;
      }

      const finalFormData = { ...formData, category: selectedCategory.id, image: base64Image || formData.image || props.product?.image || '' };

      if (props.product?.id) {
        await dispatch(modifyProduct(finalFormData));

        console.log("Producto modificado:", finalFormData);
        toast.success('Producto Modificado Exitosamente', { position: "bottom-right", className: 'text-medium py-6 px-8 rounded-md shadow-lg bg-green-100 text-green-700', });
      } else {
        await dispatch(addProduct(finalFormData));

        console.log("Producto agregado:", finalFormData);
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

          <h2 className="mb-4 text-xl font-bold text-gray-900">{props.product?.id ? 'Modificar Producto' : 'Registrar Producto Nuevo'}</h2>

          <form onSubmit={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              {/* NAME */}
              <div className="w-full">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre del Producto</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ingrese nombre del producto"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {/* STOCK */}
              <div className="w-full">
                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="15"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
              {/* CATEGORY */}
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Categoría</label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  name="category"
                  value={selectedCategory?.id || ''}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* PRICE */}
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Precio</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="$100.00"
                  required
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              {/* DESCRIPTION */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                  placeholder="Ingresa una descripción del producto"
                  required
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              {/* IMAGE */}
              <div className="sm:col-span-2">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Cargar Imagen</label>
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