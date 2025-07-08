import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiProduct } from '@/lib/axios';
import { getCookie } from "cookies-next";



interface Category {
  id: string;
  name: string;
}

interface Product {
  productName: string,
  categoryId: number,
  productPrice: number,
  productDescription: string,
  productImage: string,
  productStock: number,
  productId?: string | number,
  productAvilability: string,
  productUserId: string
}

const initialState: {
  products: Product[],
  categories: Category[],
  currentProduct: Product | {},
  loadingCategories: boolean,
  loadingProducts: boolean,
  loadingProduct: boolean,
  loadingCreateProduct: boolean,
  loadingUpdateProduct: boolean,
  loadingDeleteProduct: boolean,
} = {
  products: [],
  categories: [],
  currentProduct: {},
  loadingCategories: false,
  loadingProducts: false,
  loadingProduct: false,
  loadingCreateProduct: false,
  loadingUpdateProduct: false,
  loadingDeleteProduct: false,
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
  async ({ token, userId }: { token: string, userId: string }, { rejectWithValue }) => {
    try {
      const { data } = await apiProduct.get(
        `/auctioneer/product/Product-All?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.map((p: any) => ({
        productId: p.productId,
        productName: p.productName,
        categoryId: p.categoryId,
        productPrice: p.productPrice,
        productDescription: p.productDescription,
        productImage: p.productImage,
        productStock: p.productStock,
        productAvilability: p.productAvilability,
        productUserId: p.productUserId
      }));
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const fetchProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (
    { productId, token, userId }: { productId: string; token: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiProduct.get(
        `/auctioneer/product/${productId}?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        productId: data.productId,
        productName: data.productName,
        categoryId: data.categoryId,
        productPrice: data.productPrice,
        productDescription: data.productDescription,
        productImage: data.productImage,
        productStock: data.productStock,
        productAvilability: data.productAvilability,
        productUserId: data.productUserId,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (
    { product, token, userId }: { product: Product; token: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiProduct.post(
        `/auctioneer/product/Add-Product/${userId}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (
    {
      product,
      token,
      userId,
    }: { product: Product; token: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiProduct.put(
        `/auctioneer/product/Update-Product/${product.productId}?userId=${userId}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (
    {
      productId,
      token,
      userId,
    }: { productId: string; token: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiProduct.delete(
        `/auctioneer/product/Delete-Product/${productId}?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
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
      })

      .addCase(createProduct.pending, (state) => {
        state.loadingCreateProduct = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loadingCreateProduct = false;
        state.currentProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loadingCreateProduct = false;
        console.error('Error creating product:', action.error.message);
      })

      .addCase(updateProduct.pending, (state) => {
        state.loadingUpdateProduct = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loadingUpdateProduct = false;
        state.currentProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loadingUpdateProduct = false;
        console.error('Error updating product:', action.error.message);
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loadingDeleteProduct = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loadingDeleteProduct = false;
        state.currentProduct = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loadingDeleteProduct = false;
        console.error('Error deleting product:', action.error.message);
      });
  }
});


export default productSlice.reducer;
