import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Filter, ChevronDown, Star, Search } from 'lucide-react'
import { useGetFakeStoreProductsQuery } from '../store/api/fakeStoreApi'
import FiltersSidebar from '../components/FiltersSidebar'

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Most Relevant')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})

  const { data: menProducts, isLoading: loadingMen } = useGetFakeStoreProductsQuery({ category: "men's clothing" })
  const { data: womenProducts, isLoading: loadingWomen } = useGetFakeStoreProductsQuery({ category: "women's clothing" })
  
  const isLoading = loadingMen || loadingWomen
  const allProducts = [...(menProducts || []), ...(womenProducts || [])]
  
  // Search functionality - filter products based on search query
  const searchResults = allProducts.filter(product => {
    const query = searchQuery.toLowerCase()
    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  })

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Pagination
  const itemsPerPage = 12
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedResults = searchResults.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchResults.length / itemsPerPage)

  const sortOptions = [
    'Most Relevant',
    'Most Popular',
    'Price: Low to High',
    'Price: High to Low',
    'Rating: High to Low'
  ]

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="group">
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
        <span className="font-bold text-lg">${product.price}</span>
        <span className="text-gray-500 text-sm capitalize">{product.category}</span>
      </div>
    </Link>
  )

  // Search suggestions for no results
  const getSearchSuggestions = () => {
    const suggestions = ['shirt', 'jacket', 'pants', 'dress', 'casual', 'formal', 'men', 'women']
    return suggestions.filter(s => s !== searchQuery.toLowerCase()).slice(0, 4)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Search Results</span>
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
                <Search className="text-blue-500" size={32} />
                <div>
                  <h1 className="text-3xl font-bold">
                    Search Results {searchQuery && `for "${searchQuery}"`}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>
              </div>

              {/* Search Query Display */}
              {searchQuery && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Search size={16} className="text-blue-600" />
                      <span className="text-blue-800 font-medium">
                        Searching for: "{searchQuery}"
                      </span>
                    </div>
                    <Link 
                      to="/shop" 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Browse All Products →
                    </Link>
                  </div>
                </div>
              )}
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
                {searchResults.length > 0 && (
                  <div className="text-sm text-gray-600">
                    🔍 {searchResults.length} results found
                  </div>
                )}
              </div>
              
              {searchResults.length > 0 && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, searchResults.length)} of {searchResults.length} Products
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
              )}
            </div>

            {/* Products Grid or No Results */}
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
            ) : paginatedResults.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {paginatedResults.map((product) => (
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
                <Search size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No products found{searchQuery && ` for "${searchQuery}"`}
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or browse our categories
                </p>
                
                {/* Search Suggestions */}
                <div className="max-w-md mx-auto">
                  <p className="text-sm text-gray-600 mb-3">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {getSearchSuggestions().map((suggestion) => (
                      <Link
                        key={suggestion}
                        to={`/search?q=${suggestion}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {suggestion}
                      </Link>
                    ))}
                  </div>
                  
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage
