import { Link } from 'react-router-dom'
import { Star, ArrowRight } from 'lucide-react'
import { useGetFakeStoreProductsQuery } from '../store/api/fakeStoreApi'

const HomePage = () => {
  const { data: menProducts, isLoading: loadingMen } = useGetFakeStoreProductsQuery({ category: "men's clothing", limit: 4 })
  const { data: womenProducts, isLoading: loadingWomen } = useGetFakeStoreProductsQuery({ category: "women's clothing", limit: 4 })

  const isLoading = loadingMen || loadingWomen
  const allProducts = [...(menProducts || []), ...(womenProducts || [])]

  const heroStats = [
    { number: '200+', label: 'International Brands' },
    { number: '2,000+', label: 'High-Quality Products' },
    { number: '30,000+', label: 'Happy Customers' }
  ]

  const brandLogos = [
    'VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'
  ]

  const dressStyles = [
    { name: 'Casual', image: '/casual-style.jpg' },
    { name: 'Formal', image: '/formal-style.jpg' },
    { name: 'Party', image: '/party-style.jpg' },
    { name: 'Gym', image: '/gym-style.jpg' }
  ]

  const customerReviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
      name: 'Alex K.',
      rating: 5,
      review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
    },
    {
      name: 'James L.',
      rating: 5,
      review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    }
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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors mb-12">
                Shop Now
              </button>
              
              <div className="grid grid-cols-3 gap-8">
                {heroStats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-black">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg p-8 shadow-lg">
              <img src="/images/couples_photo.png" alt="Fashion models" className="w-full max-w-lg rounded-lg shadow-lg" />
                {/* Decorative stars */}
                <div className="absolute top-4 right-4 text-black text-2xl">✦</div>
                <div className="absolute bottom-4 left-4 text-black text-xl">✦</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center space-x-8 md:space-x-16">
            {brandLogos.map((brand, index) => (
              <div key={index} className="text-white text-xl md:text-2xl font-bold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">NEW ARRIVALS</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-3"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {allProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/new-arrivals" className="inline-flex items-center border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Top Selling */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">TOP SELLING</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-3"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {allProducts.slice(4, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/top-selling" className="inline-flex items-center border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Dress Style */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">BROWSE BY DRESS STYLE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/category/casual" className="relative bg-gray-100 rounded-lg overflow-hidden h-64 group">
              <img src="/images/casual.png" alt="Casual" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-6 left-6">
                <h3 className="text-2xl font-bold text-black">Casual</h3>
              </div>
            </Link>
            
            <Link to="/category/formal" className="relative bg-gray-100 rounded-lg overflow-hidden h-64 group">
              <img src="/images/formal.png" alt="Formal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-6 left-6">
                <h3 className="text-2xl font-bold text-black">Formal</h3>
              </div>
            </Link>
            
            <Link to="/category/party" className="relative bg-gray-100 rounded-lg overflow-hidden h-64 group">
              <img src="/images/party.png" alt="Party" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-6 left-6">
                <h3 className="text-2xl font-bold text-black">Party</h3>
              </div>
            </Link>
            
            <Link to="/category/gym" className="relative bg-gray-100 rounded-lg overflow-hidden h-64 group">
              <img src="/images/gym.png" alt="Gym" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-6 left-6">
                <h3 className="text-2xl font-bold text-black">Gym</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">OUR HAPPY CUSTOMERS</h2>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <h4 className="font-semibold text-black mb-2">{review.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
