import { createApiThunk } from "../store/createApiThunk";
import api from "../instance/api";

// ---> API INITIALIZATION SEQUENCE
// ACTION NAME
// APICALL
// SUCCESS MESSAGE : STRING | FUNCTION
// SUCCESS RESPONSE
// ERROR MESSAGE

export const login = createApiThunk(
  "auth/login",
  (requestData) => api.post("/admin-user/login", requestData),
  "Logged in successfully",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

export const fetchAllProductByUser = createApiThunk(
  "auth/login",
  ({ limit, page }) => api.get(`/product/get-all?limit=${limit}&page=${page}`),
  "",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

// Function to update a product using the API
export const updateProduct = createApiThunk(
  "update/product",
  (reqData) => api.put(`/product/update/${reqData.id}`, reqData.formData),
  "Product updated successfully",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

// Function to create a product using the API
export const createProduct = createApiThunk(
  "create/product",
  (requestData) => api.post("/product/create", requestData),
  "Product created successfully",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

// Function to create a User using the API
export const createUser = createApiThunk(
  "create/user",
  (requestData) => api.post("/admin-user/create-user", requestData),
  "User created successfully",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

// Function to fetch users using the API
export const fetchUsers = createApiThunk(
  "fetch/users",
  ({ limit, page }) =>
    api.get(`admin-user/fetch-users?limit=${limit}&page=${page}`),
  "",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

export const fetchProductFromAdmin = createApiThunk(
  "fetch/productbyadmin",
  ({ limit, page, id }) =>
    api.post(`product/get-all?limit=${limit}&page=${page}`, { userId: id }),
  "",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);

export const deleteProduct = createApiThunk(
  "delete/product",
  (id) => api.delete(`/product/${id}`),
  "Product deleted successfully",
  (response) => response.data,
  (error) =>
    error.response?.data?.message || error.message || "An error occurred."
);
