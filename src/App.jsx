import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import Pickles from "./pages/Pickles";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Contact from "./pages/Contact";
import About from "./pages/About";

// Admin Pages
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsAdminPage from "./pages/admin/ProductsAdminPage";
import AddProductPage from "./pages/admin/AddProductPage";
import OrdersPage from "./pages/admin/OrdersPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import FeedbackPage from "./pages/admin/FeedbackPage";
import CRMPage from "./pages/admin/CRMPage";
import CouponManagementPage from "./pages/admin/CouponManagementPage";
import ProductViewPage from "./pages/admin/ProductViewPage";
import ProfilePage from "./pages/admin/ProfilePage";

// Admin Layout
import Sidebar from "./components/admin/Sidebar";
import Topbar from "./components/admin/Topbar";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <div className="p-10">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return children;
};

// Admin Layout Wrapper
const AdminLayout = ({ children }) => (
  <div className="bg-gray-50 min-h-screen">
    <Sidebar />
    <div className="lg:ml-64 flex flex-col min-h-screen">
      <Topbar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
                {/* User Routes */}
                <Route path="/" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <Home />
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/pickles" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <Pickles />
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/product/:id" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <ProductDetails />
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/cart" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <Cart />
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/login" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <Login />
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/signup" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <Signup />
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/admin-login" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <AdminLogin />
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/profile" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <ProtectedRoute><Profile /></ProtectedRoute>
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/checkout" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <ProtectedRoute><Checkout /></ProtectedRoute>
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/orders" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <ProtectedRoute><OrderHistory /></ProtectedRoute>
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/contact" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <Contact />
                    </main>
                    <Footer />
                  </div>
                } />
                <Route path="/about" element={
                  <div className="min-h-screen flex flex-col bg-bg font-body">
                    <Navbar />
                    <main className="flex-1">
                      <About />
                    </main>
                    <Footer />
                  </div>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <DashboardPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <ProductsAdminPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/add-product" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AddProductPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <OrdersPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/analytics" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AnalyticsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/feedback" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <FeedbackPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/crm" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <CRMPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/coupons" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <CouponManagementPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/products/:id/view" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <ProductViewPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/profile" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <ProfilePage />
                    </AdminLayout>
                  </ProtectedRoute>
                } />

                {/* 404 */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex flex-col bg-bg font-body">
                      <Navbar />
                      <main className="flex-1">
                        <div className="flex flex-col items-center justify-center h-full py-20">
                          <h2 className="text-2xl font-bold text-red-600 mb-4">
                            404 - Page Not Found
                          </h2>
                          <a href="/" className="text-primary underline">Go Home</a>
                        </div>
                      </main>
                      <Footer />
                    </div>
                  }
                />
              </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
