// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";
import CreateProduct from "./scenes/CreateProduct";
import UserDashboard from "./scenes/UserDashboard";
import { Provider } from "react-redux";
import rootReducer from "./store";
import { configureStore } from "@reduxjs/toolkit";
import LoginPage from "./auth/login";
import AdminDashboard from "./scenes/AdminDashboard";
import PrivateRoute from "./privateRoute";
import CreateUser from "./scenes/CreateUser";
import EditProduct from "./scenes/EditProduct";
import UserDetail from "./scenes/UserDetail";

function App() {
  const store = configureStore({
    reducer: rootReducer,
  });

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute role="">
                  <div />
                </PrivateRoute>
              }
            />
            {/* User Routes */}
            <Route
              path="/user/*"
              element={
                <PrivateRoute role="user">
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<UserDashboard />} />
                      <Route path="/create-product" element={<CreateProduct />} />
                      <Route path="/edit-product" element={<EditProduct />} />
                    </Routes>
                  </AppLayout>
                </PrivateRoute>
              }
            />
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute role="admin">
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/create-user" element={<CreateUser />} />
                      <Route path="/user/:id" element={<UserDetail />} />
                    </Routes>
                    {/* Add more admin routes as needed */}
                  </AppLayout>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
