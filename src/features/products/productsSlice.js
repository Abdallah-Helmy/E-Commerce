import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://course-api.com/react-store-products'

export const fetchItems = createAsyncThunk('items/fetchItems', () => {
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => console.log(err.message))
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    mainItems: [],
    items: [],
    error: ''
  },
  reducers: {
    filter: (state, action) => {
      const {
        searchValue,
        category,
        company,
        color,
        rangeValue,
        shipping
      } = action.payload

      const searchList = state.mainItems.filter(item => {
        const { name } = item
        if (searchValue === '') {
          return item
        } else {
          for (let i = 0; i < searchValue.length; i++) {
            if (name[i] !== searchValue[i].toLowerCase()) {
              return 0
            }
          }
          return item
        }
      })
      state.items = searchList

      const categoryList = searchList.filter(item => {
        const { category: cate } = item
        if (category === 'all') {
          return item
        } else {
          return cate === category
        }
      })
      state.items = categoryList

      const companyList = categoryList.filter(item => {
        const { company: comp } = item
        if (company === 'all') {
          return item
        } else {
          return comp === company
        }
      })
      state.items = companyList

      const colorList = companyList.filter(item => {
        const { colors } = item
        if (color === 'all') {
          return item
        } else {
          return colors[0] === color
        }
      })
      state.items = colorList

      const rangeList = colorList.filter(item => {
        const { price } = item
        if (rangeValue === '400000') {
          return item
        } else {
          return price <= rangeValue
        }
      })
      state.items = rangeList

      if (shipping) {
        const shippingList = rangeList.filter(item => {
          const { shipping } = item
          return shipping === true
        })
        state.items = shippingList
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.loading = true
    })

    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
      state.mainItems = action.payload
      state.error = ''
    })

    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false
      state.items = []
      state.mainItems = []
      state.error = action.payload
    })
  }
})

export const { filter } = productsSlice.actions
export default productsSlice.reducer
