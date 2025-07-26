import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react'
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice'

const CartPage = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart)

  const handleRemoveItem = (id, size, color) => {
    dispatch(removeFromCart({ id, size, color }))
  }

  const handleUpdateQuantity = (id, size, color, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, size, color, quantity: newQuantity }))
    }
  }

  const subtotal = totalAmount
  const discount = subtotal * 0.2 // 20% discount
  const deliveryFee = 15
  const total = subtotal - discount + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/shop" 
              className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4 p-6 border border-gray-200 rounded-lg">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="text-sm text-gray-600">Color: {item.color}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold text-lg">${item.price}</span>
                      
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-l-full"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount (-20%)</span>
                  <span className="font-medium text-red-600">-${discount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button className="bg-black text-white px-6 py-3 rounded-r-full font-medium hover:bg-gray-800 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Go to Checkout</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
