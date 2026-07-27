import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import SalesReports from "./pages/SalesReports";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import AdminCategories from "./pages/AdminCategories";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

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
          element={<AddProduct />}
        />

        <Route
          path="/admin/categories"
          element={<AdminCategories />}
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