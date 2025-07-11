import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/product/productSlice'
import auctionReducer from './features/auction/auctionSlice'
import userReducer from './features/user/userSlice'
import paymentReducer from './features/payment/paymentSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
      auction: auctionReducer,
      user: userReducer,
      payment: paymentReducer
    }
  })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']