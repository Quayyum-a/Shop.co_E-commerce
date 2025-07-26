import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  CreditCard, 
  Truck, 
  MapPin,
  Lock,
  Calendar,
  User
} from 'lucide-react'
import {
  setCheckoutStep,
  updateShippingInfo,
  updatePaymentInfo,
  updateBillingAddress,
  setShippingMethod,
  placeOrder,
  clearCurrentOrder
} from '../store/slices/orderSlice'
import { clearCart } from '../store/slices/cartSlice'

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { items: cartItems, totalAmount } = useSelector(state => state.cart)
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { 
    checkoutStep, 
    shippingInfo, 
    paymentInfo, 
    shippingMethod, 
    isLoading, 
    error,
    currentOrder 
  } = useSelector(state => state.order)

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
      return
    }
    if (cartItems.length === 0 && !currentOrder) {
      navigate('/cart')
      return
    }
  }, [isAuthenticated, cartItems.length, currentOrder, navigate])

  // Pre-fill shipping info with user data
  useEffect(() => {
    if (user && !shippingInfo.firstName) {
      dispatch(updateShippingInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [user, shippingInfo.firstName, dispatch])

  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 15,
      estimatedDays: '5-7 business days',
      description: 'Regular delivery'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 25,
      estimatedDays: '2-3 business days',
      description: 'Faster delivery'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 45,
      estimatedDays: '1 business day',
      description: 'Next day delivery'
    }
  ]

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Check },
    { number: 4, title: 'Confirmation', icon: Check }
  ]

  const handleNextStep = () => {
    if (checkoutStep < 4) {
      dispatch(setCheckoutStep(checkoutStep + 1))
    }
  }

  const handlePrevStep = () => {
    if (checkoutStep > 1) {
      dispatch(setCheckoutStep(checkoutStep - 1))
    }
  }

  const handlePlaceOrder = () => {
    dispatch(placeOrder({
      shippingInfo,
      paymentInfo,
      shippingMethod,
      cartItems,
      totalAmount
    }))
  }

  const handleFinishOrder = () => {
    dispatch(clearCart())
    dispatch(clearCurrentOrder())
    navigate('/')
  }

  const subtotal = totalAmount
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + shippingMethod.price + tax

  if (!isAuthenticated || (cartItems.length === 0 && !currentOrder)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isActive = checkoutStep === step.number
              const isCompleted = checkoutStep > step.number
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-black border-black text-white' 
                        : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <Check size={20} />
                    ) : (
                      <IconComponent size={20} />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-black' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      checkoutStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Step 1: Shipping Information */}
              {checkoutStep === 1 && (
                <ShippingStep
                  shippingInfo={shippingInfo}
                  shippingMethods={shippingMethods}
                  selectedMethod={shippingMethod}
                  onUpdateShipping={(data) => dispatch(updateShippingInfo(data))}
                  onSelectMethod={(method) => dispatch(setShippingMethod(method))}
                />
              )}

              {/* Step 2: Payment Information */}
              {checkoutStep === 2 && (
                <PaymentStep
                  paymentInfo={paymentInfo}
                  shippingInfo={shippingInfo}
                  onUpdatePayment={(data) => dispatch(updatePaymentInfo(data))}
                  onUpdateBilling={(data) => dispatch(updateBillingAddress(data))}
                />
              )}

              {/* Step 3: Order Review */}
              {checkoutStep === 3 && (
                <ReviewStep
                  cartItems={cartItems}
                  shippingInfo={shippingInfo}
                  paymentInfo={paymentInfo}
                  shippingMethod={shippingMethod}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                />
              )}

              {/* Step 4: Order Confirmation */}
              {checkoutStep === 4 && currentOrder && (
                <ConfirmationStep
                  order={currentOrder}
                  onFinish={handleFinishOrder}
                />
              )}

              {/* Navigation Buttons */}
              {checkoutStep < 4 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevStep}
                    disabled={checkoutStep === 1}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                    <span>Back</span>
                  </button>

                  {checkoutStep === 3 ? (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Lock size={20} />
                      <span>{isLoading ? 'Placing Order...' : 'Place Order'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleNextStep}
                      className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <span>Continue</span>
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shippingCost={shippingMethod.price}
              tax={tax}
              total={total}
              shippingMethod={shippingMethod}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Shipping Step Component
const ShippingStep = ({ shippingInfo, shippingMethods, selectedMethod, onUpdateShipping, onSelectMethod }) => {
  const handleInputChange = (e) => {
    onUpdateShipping({ [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <input
          type="text"
          name="address"
          value={shippingInfo.address}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Apartment, suite, etc. (Optional)</label>
        <input
          type="text"
          name="apartment"
          value={shippingInfo.apartment}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
          <input
            type="text"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Shipping Methods */}
      <div>
        <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
        <div className="space-y-3">
          {shippingMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod.id === method.id ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={selectedMethod.id === method.id}
                  onChange={() => onSelectMethod(method)}
                  className="w-4 h-4 text-black focus:ring-black border-gray-300"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <Truck size={18} className="text-gray-600" />
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{method.description} • {method.estimatedDays}</p>
                </div>
              </div>
              <span className="font-semibold">${method.price}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

// Payment Step Component
const PaymentStep = ({ paymentInfo, shippingInfo, onUpdatePayment, onUpdateBilling }) => {
  const handlePaymentChange = (e) => {
    onUpdatePayment({ [e.target.name]: e.target.value })
  }

  const handleBillingChange = (e) => {
    if (e.target.name === 'sameAsShipping') {
      onUpdateBilling({ sameAsShipping: e.target.checked })
      if (e.target.checked) {
        onUpdateBilling({
          address: shippingInfo.address,
          apartment: shippingInfo.apartment,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country
        })
      }
    } else {
      onUpdateBilling({ [e.target.name]: e.target.value })
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="cardNumber"
            value={formatCardNumber(paymentInfo.cardNumber)}
            onChange={(e) => handlePaymentChange({ ...e, target: { ...e.target, value: e.target.value.replace(/\s/g, '') } })}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="expiryDate"
              value={formatExpiry(paymentInfo.expiryDate)}
              onChange={(e) => handlePaymentChange({ ...e, target: { ...e.target, value: e.target.value.replace('/', '') } })}
              placeholder="MM/YY"
              maxLength="5"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
          <input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            placeholder="123"
            maxLength="4"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card *</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="nameOnCard"
            value={paymentInfo.nameOnCard}
            onChange={handlePaymentChange}
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <h3 className="text-lg font-medium mb-4">Billing Address</h3>
        
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="sameAsShipping"
              checked={paymentInfo.billingAddress.sameAsShipping}
              onChange={handleBillingChange}
              className="w-4 h-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <span className="text-sm">Same as shipping address</span>
          </label>
        </div>

        {!paymentInfo.billingAddress.sameAsShipping && (
          <div className="space-y-4">
            <input
              type="text"
              name="address"
              value={paymentInfo.billingAddress.address}
              onChange={handleBillingChange}
              placeholder="Address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              name="apartment"
              value={paymentInfo.billingAddress.apartment}
              onChange={handleBillingChange}
              placeholder="Apartment, suite, etc. (Optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                value={paymentInfo.billingAddress.city}
                onChange={handleBillingChange}
                placeholder="City"
                required
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                name="state"
                value={paymentInfo.billingAddress.state}
                onChange={handleBillingChange}
                placeholder="State"
                required
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                name="zipCode"
                value={paymentInfo.billingAddress.zipCode}
                onChange={handleBillingChange}
                placeholder="ZIP Code"
                required
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Review Step Component
const ReviewStep = ({ cartItems, shippingInfo, paymentInfo, shippingMethod, subtotal, tax, total }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
      
      {/* Order Items */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Order Items</h3>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-600">Size: {item.size} • Color: {item.color}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Information */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
          <p>{shippingInfo.address}</p>
          {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
          <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
          <p className="mt-2 text-sm text-gray-600">
            <Truck size={16} className="inline mr-1" />
            {shippingMethod.name} - {shippingMethod.estimatedDays}
          </p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Payment Information</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium">Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
          <p>{paymentInfo.nameOnCard}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingMethod.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Confirmation Step Component
const ConfirmationStep = ({ order, onFinish }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={32} />
      </div>
      
      <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="text-left space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Order Number:</span>
            <span>{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Order Date:</span>
            <span>{new Date(order.orderDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">${order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Estimated Delivery:</span>
            <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          We've sent a confirmation email to {order.shippingInfo.email}
        </p>
        
        <button
          onClick={onFinish}
          className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

// Order Summary Component
const OrderSummary = ({ cartItems, subtotal, shippingCost, tax, total, shippingMethod }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
            <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-2">{item.title}</p>
              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping ({shippingMethod.name})</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
