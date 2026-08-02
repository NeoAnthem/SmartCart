import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const AdminCategories = lazy(() => import("./pages/AdminCategories"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const SalesReports = lazy(() => import("./pages/SalesReports"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLoader from "./components/PageLoader";

function App() {

  return (

    <BrowserRouter>
      
      <Suspense
          fallback={
              <PageLoader
                  title="Loading Page..."
                  message="Preparing SmartCart..."
              />
          }
      >

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />


        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute
              requiredRole="ROLE_ADMIN"
            >
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              requiredRole="ROLE_ADMIN"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute
              requiredRole="ROLE_ADMIN"
            >
              <SalesReports />
            </ProtectedRoute>
          }
        />

        <Route

          path="/admin/users"

          element={

            <ProtectedRoute
              requiredRole="ROLE_ADMIN"
            >

              <AdminUsers />

            </ProtectedRoute>

          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute
              role="ROLE_ADMIN"
            >
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute
              role="ROLE_ADMIN"
            >
              <EditProduct />
            </ProtectedRoute>
          }
        />

        </Routes>
        </Suspense>

      <ToastContainer
          position="top-center"
          autoClose={2500}
          newestOnTop
          pauseOnHover
          theme="dark"
          limit={3}
          style={{
              width: "min(420px, calc(100vw - 32px))"
          }}
      />

    </BrowserRouter>

  );
}

export default App;