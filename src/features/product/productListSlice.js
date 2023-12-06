import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsbyFilter, fetchProductById, createProduct, updateProduct } from './productListAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItem: 0,
  brand: [],
  category: [],
  seletedProduct: null,
};

// export const fetchallBrand = createAsyncThunk(
//   'product/fetchallBrand',
//   async () => {
//     const response = await fetchBrand();
//     return response.data;
//   }
// );
// export const fetchallCategory = createAsyncThunk(
//   'product/fetchallCategory',
//   async () => {
//     const response = await fetchCategory();
//     return response.data;
//   }
// );
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);
export const fetchSeletedProduct = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchallProductbyFilter = createAsyncThunk(
  'product/fetchallProductbyFilter',
  async ( {filter, sort, pagenation} ) => {
    const response = await fetchProductsbyFilter({filter, sort
    , pagenation});
    // console.log(response.data);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.products = [];
    },
    clearSelectedProduct : ( state ) => {
      state.seletedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchallProductbyFilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchallProductbyFilter.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItem = action.payload.totalItem
      })
      .addCase(fetchSeletedProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSeletedProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        state.seletedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex((item) => item.id === action.payload.id);
        state.products[index] = action.payload;
      })
  },
});

export const { increment, clearSelectedProduct } = productSlice.actions;

export const selectProduct = (state) => state.product.products;
export const selectTotalItem = (state) => state.product.totalItem;
export const selectedProduct = (state) => state.product.seletedProduct;
// export const selectBrand = (state) => state.product.brand;
// export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;
