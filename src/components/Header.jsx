import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.totalQuantity)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 px-4 text-sm">
        <span>Sign up and get 20% off to your first order. </span>
        <button className="underline font-medium">Sign Up Now</button>
        <button className="absolute right-4 top-2">
          <X size={16} />
        </button>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-black">
              SHOP.CO
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
                  <span>Shop</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <Link to="/sale" className="text-gray-700 hover:text-black">On Sale</Link>
              <Link to="/new-arrivals" className="text-gray-700 hover:text-black">New Arrivals</Link>
              <Link to="/brands" className="text-gray-700 hover:text-black">Brands</Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </form>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button className="md:hidden">
                <Search size={24} />
              </button>
              <Link to="/cart" className="relative">
                <ShoppingCart size={24} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Link>
              <button>
                <User size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <Link to="/shop" className="block py-2 text-gray-700">Shop</Link>
              <Link to="/sale" className="block py-2 text-gray-700">On Sale</Link>
              <Link to="/new-arrivals" className="block py-2 text-gray-700">New Arrivals</Link>
              <Link to="/brands" className="block py-2 text-gray-700">Brands</Link>
              <div className="pt-2">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header

