import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  categories: [],
  currentProduct: {}
}

interface Product {
  name: string,
  category: number,
  price: number,
  description: string,
  image: string,
  id?: number
}


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts: (state) => {
      state.products = [
        { id: 1, description: "Que buen Producto", price: 100, name: "Camisa de Coleccion", category: 1, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' },
        { id: 2, description: "Mueble nuevecito de paquete", price: 150, name: "Mueble de Vinos", category: 2, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' },
        { id: 3, description: "Coleccion de juegos vintage", price: 200, name: "Coleccion de Juegos", category: 3, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' },
        { id: 4, description: "Coleccion de juegos vintage", price: 200, name: "Coleccion de Juegos", category: 4, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' },

      ]
    },
    getCategories: (state) => {
      state.categories = [
        { id: 1, name: "ropa" },
        { id: 2, name: "muebles" },
        { id: 3, name: "maquillaje" },
        { id: 4, name: "tecnologia" },
        { id: 5, name: "accesorios" },
        { id: 6, name: "juegos" },
      ]
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload]
    },
    getCurrentProduct: (state, action: PayloadAction<number>) => {
      const cur: number = state.products.length + 2
      state.currentProduct = { id: cur, description: `test ${cur}`, price: 100, name: "Camisa de Coleccion", category: 1, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' }
    }
  },
})

// Action creators are generated for each case reducer function
export const { getProducts, getCategories, addProduct, getCurrentProduct } = productSlice.actions

export default productSlice.reducer