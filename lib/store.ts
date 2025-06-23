import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/product/productSlice'
import auctionReducer from './features/auction/auctionSlice'
import userReducer from './features/user/userSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
      auction: auctionReducer,
      user: userReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']