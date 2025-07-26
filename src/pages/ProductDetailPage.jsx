import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Star, Minus, Plus, Check } from 'lucide-react'
import { useGetFakeStoreProductByIdQuery, useGetFakeStoreProductsQuery } from '../store/api/fakeStoreApi'
import { addToCart } from '../store/slices/cartSlice'

const ProductDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data: product, isLoading } = useGetFakeStoreProductByIdQuery(id)
  const { data: relatedProducts } = useGetFakeStoreProductsQuery({ limit: 4 })
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('Large')
  const [selectedColor, setSelectedColor] = useState('Brown')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')

  const sizes = ['Small', 'Medium', 'Large', 'X-Large']
  const colors = [
    { name: 'Brown', value: '#8B4513' },
    { name: 'Green', value: '#228B22' },
    { name: 'Navy', value: '#000080' }
  ]

  const reviews = [
    {
      id: 1,
      name: 'Samantha D.',
      rating: 5,
      date: 'August 14, 2023',
      review: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
    },
    {
      id: 2,
      name: 'Alex M.',
      rating: 4,
      date: 'August 15, 2023',
      review: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."
    },
    {
      id: 3,
      name: 'Ethan R.',
      rating: 5,
      date: 'August 16, 2023',
      review: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see why it has such great reviews. Worth every penny!"
    },
    {
      id: 4,
      name: 'Olivia P.',
      rating: 4,
      date: 'August 17, 2023',
      review: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. If you're looking for a comfortable and stylish piece, this is it."
    },
    {
      id: 5,
      name: 'Liam K.',
      rating: 5,
      date: 'August 18, 2023',
      review: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of design philosophy. Highly recommended!"
    },
    {
      id: 6,
      name: 'Ava H.',
      rating: 5,
      date: 'August 19, 2023',
      review: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."
    }
  ]

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor
      }))
    }
  }

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">{product.rating}/5</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg">${product.price}</span>
        {product.discountPercentage > 0 && (
          <>
            <span className="text-gray-500 line-through">${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">-{Math.round(product.discountPercentage)}%</span>
          </>
        )}
      </div>
    </Link>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-gray-300 h-96 rounded-lg mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-300 h-24 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-gray-300 h-8 rounded mb-4"></div>
                <div className="bg-gray-300 h-6 rounded mb-4"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4 mb-8"></div>
                <div className="bg-gray-300 h-12 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    )
  }

  const images = product.images || [product.thumbnail]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/category/mens" className="text-gray-600 hover:text-gray-900">Men's</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">T-shirts</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={images[selectedImage]} 
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-black mb-4">{product.title.toUpperCase()}</h1>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">{product.rating}/5</span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Colors</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name ? 'border-black' : 'border-gray-300'
                    } flex items-center justify-center`}
                    style={{ backgroundColor: color.value }}
                  >
                    {selectedColor === color.name && (
                      <Check size={16} className={color.value === '#000080' ? 'text-white' : 'text-black'} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Choose Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 text-sm border rounded-lg ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 rounded-l-full"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 rounded-r-full"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['Product Details', 'Rating & Reviews', 'FAQs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(/\s+/g, '').replace('&', ''))}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.toLowerCase().replace(/\s+/g, '').replace('&', '')
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'productdetails' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Product Details</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'ratingreviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">All Reviews ({reviews.length})</h3>
                  <div className="flex items-center space-x-4">
                    <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>Latest</option>
                      <option>Oldest</option>
                      <option>Highest Rating</option>
                      <option>Lowest Rating</option>
                    </select>
                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
                      Write a Review
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <h4 className="font-semibold text-black mb-2">{review.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">"{review.review}"</p>
                      <p className="text-xs text-gray-500">Posted on {review.date}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                <p className="text-gray-600">FAQ content would go here.</p>
              </div>
            )}
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts?.products?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
