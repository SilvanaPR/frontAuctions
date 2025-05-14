"use client";
import React, { useState, useEffect } from "react";
import ImageReader from "./ImageReader";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, getCategories, modifyProduct } from "../../lib/features/product/productSlice";
import Link from "next/link";

export default function ProductView(props) {
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories)

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    dispatch(getCategories())

    if (props.product?.id) {
      setFormData(props.product)
      setSelectedCategory(props.product.category)
      setImageFile(props.product.image)
    }
  }, [props.product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const convertToBase64 = () => {
    const reader = new FileReader()

    reader.readAsDataURL(imageFile)

    reader.onload = () => {
      console.log('called: ', reader)
      handleChange({ target: { name: "image", value: reader.result } })
    }
  }

  useEffect(() => { console.log(formData) }, [formData.image])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.product?.id) {
      dispatch(modifyProduct(formData));
      console.log("modifica");

    } else {
      dispatch(addProduct(formData));
    }

    console.log("Form data:", formData);
    console.log("Image:", convertToBase64());
  };

  const handleCategoryChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedCategoryObject = categories.find(cat => cat.id === selectedId);
    setSelectedCategory(selectedCategoryObject);
    setFormData(prev => ({
      ...prev,
      category: selectedCategoryObject ? selectedCategoryObject.id : '',
    }));
  };

  return (
    <div className="items-center justify-center h-screen w-full">
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-white rounded-lg shadow">
          <div className="place-content-end">
            <Link href={`/Product`} className="pt-3 lg:inline-flex mt-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            </Link>
          </div>

          <h2 className="mb-4 text-xl font-bold text-gray-900">Registrar Producto Nuevo</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
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
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Categoría</label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  name="category"
                  value={selectedCategory || ''}
                  onChange={handleCategoryChange}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
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
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                  placeholder="Ingresa una descripción del producto"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Cargar Imagen</label>
                <ImageReader onImageChange={setImageFile} imagePreview={imageFile} />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-brand rounded-lg focus:ring-4 focus:ring-primary-200">
              {`${props.product ? 'Modificar' : 'Agregar'} Producto`}
            </button>

          </form>
        </div>
      </section>
    </div>
  );
}
