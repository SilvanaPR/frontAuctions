import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../axios';


interface Category {
  id: string;
  name: string;
}

interface Product {
  name: string,
  category: number,
  price: number,
  description: string,
  image: string,
  stock: number,
  id?: number
}

const initialState: {
  products: Product[],
  categories: Category[],
  currentProduct: Product | {},
  loadingCategories: boolean
} = {
  products: [],
  categories: [],
  currentProduct: {},
  loadingCategories: false
};




// Thunk para obtener categorías desde la API
export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const { data } = await api.get('/auctioneer/category');
    // ⬇️  transformamos la forma para que el resto de la app use {id,name}
    return data.map((c: any) => ({
      id: c.categoryId,
      name: c.categoryName,
    }));
  }
);

// Slice con reducers + extraReducers (CORRECTAMENTE SEPARADO)
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts: (state) => {
      state.products = [
        { id: 1, description: "Que buen Producto", price: 100, name: "Camisa de Coleccion", category: 1, stock: 10, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' },
        { id: 2, description: "Mueble nuevecito de paquete", price: 150, name: "Mueble de Vinos", category: 2, stock: 12, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' },
        { id: 3, description: "Coleccion de juegos vintage", price: 200, name: "Coleccion de Juegos", category: 3, stock: 2, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' },
        { id: 4, description: "Coleccion de juegos vintage", price: 200, name: "Coleccion de Juegos", category: 4, stock: 1, image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' },
      ];
    },/*
    getCategories: (state) => {
      state.categories = [
        { id: 1, name: "ropa" },
        { id: 2, name: "muebles" },
        { id: 3, name: "maquillaje" },
        { id: 4, name: "tecnologia" },
        { id: 5, name: "accesorios" },
        { id: 6, name: "juegos" },
      ];
    },*/
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
    },
    getCurrentProduct: (state, action: PayloadAction<number>) => {
      const cur = state.products.length + 2;
      state.currentProduct = {
        id: cur,
        description: `test ${cur}`,
        price: 100,
        name: "Camisa de Coleccion",
        category: 1,
        stock: 15,
        image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg'
      };
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter(product => product.id !== action.payload.id);
    },
    modifyProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        console.error('Error fetching categories:', action.error.message);
      });
  }
});

export const {
  getProducts,
  //getCategories,
  addProduct,
  deleteProduct,
  getCurrentProduct,
  modifyProduct
} = productSlice.actions;

export default productSlice.reducer;
