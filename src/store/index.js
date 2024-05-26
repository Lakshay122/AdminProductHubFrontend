import { combineReducers } from "@reduxjs/toolkit";
import slice from "./slice";
import authslice from "./authslice";
const rootReducer = combineReducers({
  slice: slice,
  authslice
});

export default rootReducer;
