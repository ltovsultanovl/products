import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductsState } from '../types/types';

const initialState: ProductsState = {
  products: [],
  favorites: [],
  loading: false,
  error: null,
};

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data.map((item: any) => ({
      id: item.id,
      name: item.title,
      description: item.description,
      imageUrl: item.image,
      price: item.price,
      isLiked: false,
      rating: {
        rate: item.rating.rate,
        count: item.rating.count,
      },
      category: item.category,
    }));
  }
);


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    addToFavorites(state, action: PayloadAction<number>) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        const newProducts: Product[] = action.payload;
        state.products = state.products.map((existingProduct) => {
          const updatedProduct = newProducts.find(
            (newProduct) => newProduct.id === existingProduct.id
          );
          return updatedProduct ? { ...existingProduct, ...updatedProduct } : existingProduct;
        });
        const newProductsToAdd = newProducts.filter(
          (newProduct) => !state.products.some((p) => p.id === newProduct.id)
        );
        state.products.push(...newProductsToAdd);
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки продуктов';
      });

  },
});

export const {
  setProduct,
  toggleLike,
  deleteProduct,
  addProduct,
  updateProduct,
  addToFavorites,
  removeFromFavorites,
} = productsSlice.actions;

export default productsSlice.reducer;

