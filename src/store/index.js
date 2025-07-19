import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { dummyJsonApi } from './api/dummyJsonApi'
import { fakeStoreApi } from './api/fakeStoreApi'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dummyJsonApi.middleware,
      fakeStoreApi.middleware
    ),
})

setupListeners(store.dispatch)

