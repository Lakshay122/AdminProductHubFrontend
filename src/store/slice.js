import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  createUser,
  deleteProduct,
  fetchAllProductByUser,
  fetchProductFromAdmin,
  fetchUsers,
  updateProduct,
} from "../utils/apiCalls";

const initialState = {
  data: {
    productsInfo: [],
    usersInfo: [],
  },
  loading: {
    userProducts: false,
    createProduct: false,
    updateProduct: false,
    fetchUsers: false,
    createUser: false,
  },
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch all product for user
      .addCase(fetchAllProductByUser.pending, (state, action) => {
        state.loading.userProducts = true;
      })
      .addCase(fetchAllProductByUser.fulfilled, (state, action) => {
        state.loading.userProducts = false;
        state.data.productsInfo = action.payload;
      })
      .addCase(fetchAllProductByUser.rejected, (state, action) => {
        state.loading.userProducts = false;
      })

      .addCase(fetchProductFromAdmin.pending, (state, action) => {
        state.loading.userProducts = true;
      })
      .addCase(fetchProductFromAdmin.fulfilled, (state, action) => {
        state.loading.userProducts = false;
        state.data.productsInfo = action.payload;
      })
      .addCase(fetchProductFromAdmin.rejected, (state, action) => {
        state.loading.userProducts = false;
      })

      // fetch all users
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading.fetchUsers = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading.fetchUsers = false;
        state.data.usersInfo = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading.fetchUsers = false;
      })

      //create a new Product
      .addCase(createProduct.pending, (state, action) => {
        state.loading.createProduct = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading.createProduct = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading.createProduct = false;
      })

      //create a new User
      .addCase(createUser.pending, (state, action) => {
        state.loading.createUser = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading.createUser = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading.createUser = false;
      })

      //update a new Product
      .addCase(updateProduct.pending, (state, action) => {
        state.loading.updateProduct = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading.updateProduct = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading.updateProduct = false;
      });
  },
});

export default slice.reducer;
