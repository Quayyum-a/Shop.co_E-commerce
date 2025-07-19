import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, image, size, color } = action.payload
      const existingItem = state.items.find(
        item => item.id === id && item.size === size && item.color === color
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          id,
          title,
          price,
          image,
          size,
          color,
          quantity: 1,
        })
      }

      state.totalQuantity += 1
      state.totalAmount += price
    },
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.size === size && item.color === color
      )

      if (itemIndex !== -1) {
        const item = state.items[itemIndex]
        state.totalQuantity -= item.quantity
        state.totalAmount -= item.price * item.quantity
        state.items.splice(itemIndex, 1)
      }
    },
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload
      const item = state.items.find(
        item => item.id === id && item.size === size && item.color === color
      )

      if (item && quantity > 0) {
        const quantityDiff = quantity - item.quantity
        state.totalQuantity += quantityDiff
        state.totalAmount += item.price * quantityDiff
        item.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

