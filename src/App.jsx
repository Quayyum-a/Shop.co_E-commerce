import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop" element={<CategoryPage />} />
        <Route path="/sale" element={<CategoryPage />} />
        <Route path="/new-arrivals" element={<CategoryPage />} />
        <Route path="/brands" element={<CategoryPage />} />
        <Route path="/search" element={<CategoryPage />} />
      </Routes>
    </Layout>
  )
}

export default App
