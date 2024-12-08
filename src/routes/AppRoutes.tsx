import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductsPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CreateProductPage from "../pages/CreateProductPage";
import EditProductPage from "../pages/EditProductPage";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="/edit-product/:id" element={<EditProductPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;

