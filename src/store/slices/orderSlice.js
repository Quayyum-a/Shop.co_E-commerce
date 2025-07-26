import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
  checkoutStep: 1, // 1: Shipping, 2: Payment, 3: Review, 4: Confirmation
  shippingInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  },
  paymentInfo: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: {
      sameAsShipping: true,
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    }
  },
  shippingMethod: {
    id: 'standard',
    name: 'Standard Shipping',
    price: 15,
    estimatedDays: '5-7 business days'
  }
}

// Mock order database
const mockOrders = []

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCheckoutStep: (state, action) => {
      state.checkoutStep = action.payload
    },
    updateShippingInfo: (state, action) => {
      state.shippingInfo = { ...state.shippingInfo, ...action.payload }
    },
    updatePaymentInfo: (state, action) => {
      state.paymentInfo = { ...state.paymentInfo, ...action.payload }
    },
    updateBillingAddress: (state, action) => {
      state.paymentInfo.billingAddress = { ...state.paymentInfo.billingAddress, ...action.payload }
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload
    },
    placeOrderStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    placeOrderSuccess: (state, action) => {
      state.isLoading = false
      state.currentOrder = action.payload
      state.orders.push(action.payload)
      state.checkoutStep = 4
      // Save orders to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
      existingOrders.push(action.payload)
      localStorage.setItem('userOrders', JSON.stringify(existingOrders))
    },
    placeOrderFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    loadOrders: (state) => {
      // Load orders from localStorage
      const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
      state.orders = savedOrders
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
      state.checkoutStep = 1
      state.shippingInfo = initialState.shippingInfo
      state.paymentInfo = initialState.paymentInfo
      state.shippingMethod = initialState.shippingMethod
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

// Async action to place order
export const placeOrder = (orderData) => (dispatch, getState) => {
  dispatch(placeOrderStart())
  
  // Simulate API call
  setTimeout(() => {
    try {
      const { cart, auth } = getState()
      
      const order = {
        id: `ORD-${Date.now()}`,
        userId: auth.user?.id,
        items: cart.items,
        subtotal: cart.totalAmount,
        shipping: orderData.shippingMethod.price,
        tax: Math.round(cart.totalAmount * 0.08 * 100) / 100, // 8% tax
        total: cart.totalAmount + orderData.shippingMethod.price + Math.round(cart.totalAmount * 0.08 * 100) / 100,
        shippingInfo: orderData.shippingInfo,
        paymentInfo: {
          method: 'Credit Card',
          last4: orderData.paymentInfo.cardNumber.slice(-4),
          nameOnCard: orderData.paymentInfo.nameOnCard
        },
        shippingMethod: orderData.shippingMethod,
        status: 'Processing',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + (orderData.shippingMethod.estimatedDays.split('-')[1].split(' ')[0] * 24 * 60 * 60 * 1000)).toISOString()
      }
      
      dispatch(placeOrderSuccess(order))
    } catch (error) {
      dispatch(placeOrderFailure('Failed to place order. Please try again.'))
    }
  }, 2000) // Simulate network delay
}

export const {
  setCheckoutStep,
  updateShippingInfo,
  updatePaymentInfo,
  updateBillingAddress,
  setShippingMethod,
  placeOrderStart,
  placeOrderSuccess,
  placeOrderFailure,
  loadOrders,
  clearCurrentOrder,
  clearError
} = orderSlice.actions

export default orderSlice.reducer
