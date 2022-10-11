import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const singleProductUrl = 'https://course-api.com/react-store-single-product?id='

export const fetchSingleProduct = createAsyncThunk(
  'items/fetchSingleProduct',
  id => {
    return axios
      .get(`${singleProductUrl}${id}`)
      .then(res => res.data)
      .catch(err => err.message)
  }
)

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    loading: false,
    singleProduct: [],
    error: '',
    counter: localStorage.getItem('counter') || 0,
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    cartItemsAmounts:
      JSON.parse(localStorage.getItem('cartItemsAmounts')) || [],
    totalPriceOfProducts:
      JSON.parse(localStorage.getItem('totalPriceOfProducts')) || [],
    totalPriceOfAllCartProducts:
      JSON.parse(localStorage.getItem('totalPriceOfAllCartProducts')) || 0,
    isFound: false
  },

  reducers: {
    addToCart: (state, action) => {
      let sum = 0
      for (let i = 0; i < state.cartItemsAmounts.length; i++) {
        sum += state.cartItemsAmounts[i]
      }
      state.counter = sum
      localStorage.setItem('counter', state.counter)
    },
    addProduct: (state, action) => {
      const found = state.cartItems.find(item => {
        const { id } = item
        return id === action.payload.id
      })

      if (found) {
        state.isFound = true
      } else {
        state.cartItems.push(action.payload)
        state.isFound = false
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    addAmountOfProducts: (state, action) => {
      const { amount, index } = action.payload

      if (!state.isFound) {
        if (index === -1) {
          state.cartItemsAmounts.push(amount)
        }
        state.isFound = false
      }
      if (index >= 0) {
        const newcartItemsAmounts = state.cartItemsAmounts.map((item, ind) => {
          if (ind === index) {
            return item + amount
          } else {
            return item
          }
        })
        state.cartItemsAmounts = newcartItemsAmounts
      }
      localStorage.setItem(
        'cartItemsAmounts',
        JSON.stringify(state.cartItemsAmounts)
      )
    },
    totalPrice: (state, action) => {
      const { amount, price, index, type } = action.payload

      if (type && !state.isFound) {
        state.totalPriceOfProducts.push(amount * price)
      } else if (index >= 0) {
        state.totalPriceOfProducts[index] = amount * price
      }
      localStorage.setItem(
        'totalPriceOfProducts',
        JSON.stringify(state.totalPriceOfProducts)
      )
    },
    totalPricesOfAllCartProducts: (state, action) => {
      let sum = 0
      for (let i = 0; i < state.totalPriceOfProducts.length; i++) {
        sum += state.totalPriceOfProducts[i]
      }
      state.totalPriceOfAllCartProducts = sum

      localStorage.setItem(
        'totalPriceOfAllCartProducts',
        JSON.stringify(state.totalPriceOfAllCartProducts)
      )
    },
    deleteItem: (state, action) => {
      state.cartItems.splice(action.payload, 1)
      state.counter -= state.cartItemsAmounts[action.payload]
      state.cartItemsAmounts.splice(action.payload, 1)
      state.totalPriceOfProducts.splice(action.payload, 1)

      // For Clear item From Local Storage
      localStorage.setItem('counter', state.counter)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      localStorage.setItem(
        'cartItemsAmounts',
        JSON.stringify(state.cartItemsAmounts)
      )
      localStorage.setItem(
        'totalPriceOfProducts',
        JSON.stringify(state.totalPriceOfProducts)
      )
      localStorage.setItem(
        'totalPriceOfAllCartProducts',
        JSON.stringify(state.totalPriceOfAllCartProducts)
      )
    },
    clearCart: (state, action) => {
      state.cartItems = []
      state.cartItemsAmounts = []
      state.totalPriceOfProducts = []
      state.counter = 0
      state.isFound = false
      localStorage.clear()
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchSingleProduct.pending, state => {
      state.loading = true
    })

    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false
      state.singleProduct = action.payload
      state.error = ''
    })

    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false
      state.singleProduct = []
      state.error = action.payload
    })
  }
})

export const {
  addToCart,
  addProduct,
  totalPrice,
  totalPricesOfAllCartProducts,
  deleteItem,
  addAmountOfProducts,
  clearCart
} = singleProductSlice.actions
export default singleProductSlice.reducer
