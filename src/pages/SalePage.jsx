import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, ChevronDown, Star, Tag } from 'lucide-react'
import { useGetFakeStoreProductsQuery } from '../store/api/fakeStoreApi'
import FiltersSidebar from '../components/FiltersSidebar'

const SalePage = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Biggest Discount')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})

  const { data: menProducts, isLoading: loadingMen } = useGetFakeStoreProductsQuery({ category: "men's clothing" })
  const { data: womenProducts, isLoading: loadingWomen } = useGetFakeStoreProductsQuery({ category: "women's clothing" })
  
  const isLoading = loadingMen || loadingWomen
  const allProducts = [...(menProducts || []), ...(womenProducts || [])]
  
  // Simulate sale products with random discounts
  const saleProducts = allProducts.map(product => {
    const discountPercentage = Math.floor(Math.random() * 50) + 10 // 10-60% discount
    const originalPrice = product.price * (1 + discountPercentage / 100)
    return {
      ...product,
      originalPrice: originalPrice.toFixed(2),
      discountPercentage,
      salePrice: product.price
    }
  })

  // Pagination
  const itemsPerPage = 12
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = saleProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(saleProducts.length / itemsPerPage)

  const sortOptions = [
    'Biggest Discount',
    'Price: Low to High',
    'Price: High to Low',
    'Most Popular',
    'Rating: High to Low'
  ]

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="group relative">
      {/* Sale Badge */}
      <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
        -{product.discountPercentage}% OFF
      </div>
      
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < Math.floor(product.rating?.rate || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">{product.rating?.rate || 4}/5</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg text-red-600">${product.salePrice}</span>
        <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
        <span className="text-green-600 text-sm font-medium">
          Save ${(product.originalPrice - product.salePrice).toFixed(2)}
        </span>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Sale</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex">
          {/* Filters Sidebar */}
          <FiltersSidebar 
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Main Content */}
          <div className="flex-1 md:ml-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Tag className="text-red-500" size={32} />
                <h1 className="text-3xl font-bold">Sale - Up to 60% Off</h1>
              </div>
              <p className="text-gray-600 mb-6">
                Limited time offers on our most popular clothing items. Don't miss out on these amazing deals!
              </p>
              
              {/* Sale Banner */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Flash Sale</h2>
                    <p className="text-red-100">Extra 20% off when you buy 2 or more items</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">60%</div>
                    <div className="text-red-100">MAX OFF</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsFiltersOpen(true)}
                  className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>
                <div className="text-sm text-gray-600">
                  🔥 {saleProducts.length} items on sale
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, saleProducts.length)} of {saleProducts.length} Products
                </span>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 h-64 rounded-lg mb-3"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                      const pageNum = i + 1
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 text-sm border rounded ${
                            currentPage === pageNum 
                              ? 'bg-black text-white border-black' 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                    
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No sale items available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalePage
