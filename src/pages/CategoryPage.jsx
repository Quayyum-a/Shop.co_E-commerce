import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Filter, ChevronDown, Star } from 'lucide-react'
import { useGetFakeStoreProductsQuery } from '../store/api/fakeStoreApi'
import FiltersSidebar from '../components/FiltersSidebar'

const CategoryPage = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Most Popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})

  // Determine which API call to make
  const shouldSearch = !!searchQuery
  const shouldFilterByCategory = !!category && category !== 'shop'

  // Map category names to API categories
  const getCategoryName = (cat) => {
    const categoryMap = {
      'mens': "men's clothing",
      'womens': "women's clothing",
      'casual': "men's clothing",
      'formal': "men's clothing",
      'party': "women's clothing",
      'gym': "men's clothing"
    }
    return categoryMap[cat] || cat
  }

  const { data: productsData, isLoading } = useGetFakeStoreProductsQuery(
    {
      limit: 20,
      category: shouldFilterByCategory ? getCategoryName(category) : ''
    }
  )

  // For search, we'll filter products client-side since FakeStore API doesn't have search
  const searchData = searchQuery ? {
    products: productsData?.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []
  } : null

  const products = shouldSearch ? searchData?.products : productsData
  const totalProducts = products?.length || 0
  const loading = isLoading

  // Pagination
  const itemsPerPage = 9
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = products?.slice(startIndex, endIndex) || []

  const getPageTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`
    if (category) return category.charAt(0).toUpperCase() + category.slice(1)
    return 'All Products'
  }

  const getBreadcrumbs = () => {
    const breadcrumbs = [{ name: 'Home', href: '/' }]
    
    if (searchQuery) {
      breadcrumbs.push({ name: 'Search', href: '/search' })
    } else if (category) {
      breadcrumbs.push({ name: category.charAt(0).toUpperCase() + category.slice(1), href: `/category/${category}` })
    } else {
      breadcrumbs.push({ name: 'Shop', href: '/shop' })
    }
    
    return breadcrumbs
  }

  const sortOptions = [
    'Most Popular',
    'Newest',
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
      </div>
    </Link>
  )

  const totalPages = Math.ceil((totalProducts || 0) / itemsPerPage)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            {getBreadcrumbs().map((breadcrumb, index) => (
              <div key={breadcrumb.name} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <Link 
                  to={breadcrumb.href} 
                  className={`${index === getBreadcrumbs().length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {breadcrumb.name}
                </Link>
              </div>
            ))}
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
                <button 
                  onClick={() => setIsFiltersOpen(true)}
                  className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * 9) + 1}-{Math.min(currentPage * 9, totalProducts || 0)} of {totalProducts || 0} Products
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
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 h-64 rounded-lg mb-3"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts && paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    
                    {totalPages > 5 && (
                      <>
                        <span className="px-2">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className={`px-3 py-2 text-sm border rounded ${
                            currentPage === totalPages 
                              ? 'bg-black text-white border-black' 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    
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
                <p className="text-gray-600">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
