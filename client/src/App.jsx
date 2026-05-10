import { useState, useEffect, useRef } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
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
import LoadingScreen from './components/LoadingScreen'
import { getProducts } from './api/products'

function App() {
  const { isLoaded } = useAuth()
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const fetchStarted = useRef(false)

  useEffect(() => {
    if (!isLoaded || fetchStarted.current) return
    fetchStarted.current = true

    // Clerk is loaded → 40%
    setLoadingProgress(40)

    // Short pause then start fetch → 60%
    const startFetch = setTimeout(() => {
      setLoadingProgress(60)

      getProducts()
        .then(() => {
          // Products received → 90%
          setLoadingProgress(90)

          setTimeout(() => {
            setLoadingProgress(100)
            setIsComplete(true)

            setTimeout(() => {
              setShowLoader(false)
            }, 600)
          }, 500)
        })
        .catch(() => {
          setLoadingProgress(90)
          setTimeout(() => {
            setLoadingProgress(100)
            setIsComplete(true)
            setTimeout(() => setShowLoader(false), 600)
          }, 500)
        })
    }, 200)

    return () => clearTimeout(startFetch)
  }, [isLoaded])

  return (
    <BrowserRouter>
      {showLoader && (
        <LoadingScreen progress={loadingProgress} isComplete={isComplete} />
      )}
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
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
