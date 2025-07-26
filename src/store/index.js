import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { fakeStoreApi } from './api/fakeStoreApi'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fakeStoreApi.middleware
    ),
})

setupListeners(store.dispatch)
