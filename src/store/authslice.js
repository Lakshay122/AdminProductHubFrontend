import { createSlice } from "@reduxjs/toolkit";
import { login } from "../utils/apiCalls";

const initialState = {
  data: {},
  loading: {
    login: false,
  },
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Login
      .addCase(login.pending, (state, action) => {
        state.loading.login = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading.login = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading.login = false;
      });
  },
});

export default slice.reducer;
