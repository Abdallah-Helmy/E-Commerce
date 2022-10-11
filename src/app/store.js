import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import singleProductReducer from '../features/singleProduct/SingleProductslice'
import logger from 'redux-logger'
import { applyMiddleware } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct: singleProductReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

export default store
