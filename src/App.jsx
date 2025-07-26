import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import SalePage from './pages/SalePage'
import NewArrivalsPage from './pages/NewArrivalsPage'
import BrandsPage from './pages/BrandsPage'
import SearchResultsPage from './pages/SearchResultsPage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AccountPage from './pages/AccountPage'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/account" element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        } />
        <Route path="/top-selling" element={<CategoryPage />} />
      </Routes>
    </Layout>
  )
}

export default App
