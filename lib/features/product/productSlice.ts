import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiProduct } from '@/lib/axios';

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
  id?: string | number,
  availability: string,
  user: string
}

const initialState: {
  products: Product[],
  categories: Category[],
  currentProduct: Product | {},
  loadingCategories: boolean,
  loadingProducts: boolean,
  loadingProduct: boolean,
} = {
  products: [],
  categories: [],
  currentProduct: {},
  loadingCategories: false,
  loadingProducts: false,
  loadingProduct: false,
};


export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const { data } = await apiProduct.get('/auctioneer/category');
    return data.map((c: any) => ({
      id: c.categoryId,
      name: c.categoryName,
    }));
  }
);

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const { data } = await apiProduct.get('/auctioneer/product?userId=7671574c-6fb8-43b7-98be-897a98c487a0');
    return data.map((p: any) => ({
      id: p.productId,
      name: p.productName,
      category: p.categoryId,
      price: p.productPrice,
      description: p.productDescription,
      image: p.productImage,
      stock: p.productStock,
      availability: p.productAvilability,
      user: p.productUserId
    }));
  }
);

export const fetchProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (productId: string) => {
    const { data } = await apiProduct.get(`/auctioneer/product/${productId}?userId=7671574c-6fb8-43b7-98be-897a98c487a0`);
    return {
      id: data.productId,
      name: data.productName,
      category: data.categoryId,
      price: data.productPrice,
      description: data.productDescription,
      image: data.productImage,
      stock: data.productStock,
      availability: data.productAvilability,
      user: data.productUserId,
    };
  }
);




export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
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
      // CATEGORIAS
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
      })

      // PRODUCTO
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        console.error('Error fetching products:', action.error.message);
      })

      .addCase(fetchProduct.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        console.error('Error fetching single product:', action.error.message);
      });
  }
});

export const {
  addProduct,
  deleteProduct,
  modifyProduct,
} = productSlice.actions;

export default productSlice.reducer;
