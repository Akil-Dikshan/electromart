import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/order-success" element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;