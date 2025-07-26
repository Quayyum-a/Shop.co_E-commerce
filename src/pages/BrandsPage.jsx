import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, ChevronDown, Star, Award } from 'lucide-react'
import { useGetFakeStoreProductsQuery } from '../store/api/fakeStoreApi'
import FiltersSidebar from '../components/FiltersSidebar'

const BrandsPage = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Most Popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [selectedBrand, setSelectedBrand] = useState('all')

  const { data: menProducts, isLoading: loadingMen } = useGetFakeStoreProductsQuery({ category: "men's clothing" })
  const { data: womenProducts, isLoading: loadingWomen } = useGetFakeStoreProductsQuery({ category: "women's clothing" })
  
  const isLoading = loadingMen || loadingWomen
  const allProducts = [...(menProducts || []), ...(womenProducts || [])]
  
  // Simulate brands by assigning random brand names to products
  const brands = ['Fjallraven', 'Nike', 'Adidas', 'H&M', 'Zara', 'Uniqlo', 'Gap', 'Levi\'s']
  const productsWithBrands = allProducts.map(product => ({
    ...product,
    brand: brands[Math.floor(Math.random() * brands.length)]
  }))

  // Create brand statistics
  const brandStats = brands.map(brand => ({
    name: brand,
    count: productsWithBrands.filter(p => p.brand === brand).length,
    rating: (3.8 + Math.random() * 1.2).toFixed(1) // Random rating between 3.8-5.0
  })).sort((a, b) => b.count - a.count)

  // Filter products by selected brand
  const filteredProducts = selectedBrand === 'all' 
    ? productsWithBrands 
    : productsWithBrands.filter(p => p.brand === selectedBrand)

  // Pagination
  const itemsPerPage = 12
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const sortOptions = [
    'Most Popular',
    'Brand A-Z',
    'Brand Z-A',
    'Price: Low to High',
    'Price: High to Low',
    'Rating: High to Low'
  ]

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Brand Badge */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-medium text-gray-700">
          {product.brand}
        </div>
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
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">${product.price}</span>
        <span className="text-blue-600 text-sm font-medium">{product.brand}</span>
      </div>
    </Link>
  )

  const BrandCard = ({ brand, count, rating, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border text-left transition-all hover:shadow-md ${
        isSelected 
          ? 'border-black bg-black text-white' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">{brand}</h3>
        <Award size={20} className={isSelected ? 'text-white' : 'text-gray-400'} />
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <span className={isSelected ? 'text-gray-200' : 'text-gray-600'}>
          {count} products
        </span>
        <div className="flex items-center space-x-1">
          <Star size={14} className={`${isSelected ? 'text-yellow-300' : 'text-yellow-400'} fill-current`} />
          <span>{rating}</span>
        </div>
      </div>
    </button>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Brands</span>
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
                <Award className="text-blue-500" size={32} />
                <h1 className="text-3xl font-bold">Our Brands</h1>
              </div>
              <p className="text-gray-600 mb-6">
                Discover quality clothing from our curated selection of trusted brands
              </p>
              
              {/* Brands Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
                <BrandCard
                  brand="All Brands"
                  count={productsWithBrands.length}
                  rating="4.2"
                  isSelected={selectedBrand === 'all'}
                  onClick={() => {
                    setSelectedBrand('all')
                    setCurrentPage(1)
                  }}
                />
                {brandStats.slice(0, 7).map((brand) => (
                  <BrandCard
                    key={brand.name}
                    brand={brand.name}
                    count={brand.count}
                    rating={brand.rating}
                    isSelected={selectedBrand === brand.name}
                    onClick={() => {
                      setSelectedBrand(brand.name)
                      setCurrentPage(1)
                    }}
                  />
                ))}
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
                  {selectedBrand === 'all' ? (
                    `��️ ${brands.length} brands • ${filteredProducts.length} products`
                  ) : (
                    `🏷️ ${selectedBrand} • ${filteredProducts.length} products`
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} Products
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
                <p className="text-gray-600">No products found for this brand.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandsPage
