"use client";
import React, { useState, useEffect } from "react";
import ImageReader from "../../components/ImageReader";
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, addProduct } from "../../../lib/features/product/productSlice";

export default function CreateProduct() {
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
  }, []);

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
      console.log(formData)
    }
  }

  useEffect(() => { console.log(formData) }, [formData.image])

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addProduct(formData));
    console.log("Form data:", formData);
    console.log("Image:", convertToBase64());
  };

  const handleCategoryChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedCategoryObject = categories.find(cat => cat.id === selectedId);
    setSelectedCategory(selectedCategoryObject);
    setFormData(prev => ({
      ...prev,
      category: selectedCategoryObject ? selectedCategoryObject.name : '',
    }));
  };

  return (
    <div className="items-center justify-center h-screen w-full">
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-white rounded-lg shadow">
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
                  value={selectedCategory ? selectedCategory.id : ''}
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
                <ImageReader onImageChange={setImageFile} />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-brand rounded-lg focus:ring-4 focus:ring-primary-200">
              Agregar Producto
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
