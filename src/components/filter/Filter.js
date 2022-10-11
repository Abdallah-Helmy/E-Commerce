import React, { useEffect, useState } from 'react'
import './filter.css'
import { filter } from '../../features/products/productsSlice'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function Filter ({ categories, companies, colors }) {
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')
  const [category, setCategory] = useState('all')
  const [company, setCompany] = useState('all')
  const [color, setColor] = useState('all')
  const [rangeValue, setRangeValue] = useState('400000')
  const [shipping, setShipping] = useState(false)

  useEffect(() => {
    dispatch(
      filter({ searchValue, category, company, color, rangeValue, shipping })
    )
  }, [searchValue, category, company, color, rangeValue, shipping])

  const addActiveClassInCategory = ind => {
    const categories = document.querySelectorAll('.categories li')
    categories.forEach((category, index) => {
      category.classList.remove('active-category')
      if (ind === index) {
        category.classList.add('active-category')
      }
    })
  }

  const addActiveClassInColor = ind => {
    const colors = document.querySelectorAll('.colors li')
    colors.forEach((color, index) => {
      color.classList.remove('all-active')
      color.classList.remove('color-active')
      if (ind === index && ind === 0) {
        color.classList.add('all-active')
      } else if (ind === index) {
        color.classList.add('color-active')
      }
    })
  }

  const resetAllFilters = () => {
    addActiveClassInCategory(0)
    addActiveClassInColor(0)
    document.getElementById('shipping').checked = false

    setSearchValue('')
    setCategory('all')
    setCompany('all')
    setColor('all')
    setRangeValue('400000')
    setShipping(false)

    dispatch(
      filter({ searchValue, category, company, color, rangeValue, shipping })
    )
  }

  return (
    <aside className='filter col-2 p-0'>
      <div className='content'>
        <input
          type='serch'
          placeholder='Search'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <div className='category mt-3'>
          <h5>Category</h5>
          <ul className='categories'>
            {categories.map((category, index) => {
              return (
                <li
                  className={index === 0 ? 'active-category' : null}
                  key={index}
                  onClick={() => {
                    addActiveClassInCategory(index)
                    setCategory(category)
                  }}
                >
                  {category}
                </li>
              )
            })}
          </ul>
        </div>
        <div className='company'>
          <h5>Company</h5>
          <select value={company} onChange={e => setCompany(e.target.value)}>
            {companies.map((company, index) => {
              return <option key={index}>{company}</option>
            })}
          </select>
        </div>
        <div className='colors mt-3'>
          <h5>Colors</h5>
          <ul className='colors'>
            {colors.map((color, index) => {
              return (
                <li
                  className={index === 0 ? 'all-active blur' : 'blur'}
                  key={index}
                  style={{ backgroundColor: `${color}` }}
                  onClick={() => {
                    addActiveClassInColor(index)
                    setColor(color)
                  }}
                >
                  {index === 0 ? 'All' : null}
                </li>
              )
            })}
          </ul>
        </div>
        <div className='price'>
          <h5>Price</h5>
          <li>
            <label htmlFor='priceRange' style={{ color: '#324d67' }}>
              ${rangeValue}
            </label>
            <input
              type='range'
              min='0'
              max='400000'
              value={rangeValue}
              onChange={e => setRangeValue(e.target.value)}
              id='priceRange'
              className='p-0 d-block'
            />
          </li>
        </div>
        <div className='free-shipping mt-2 d-flex align-items-center'>
          <label htmlFor='shipping' className='me-4'>
            Free Shipping
          </label>
          <input
            type='checkbox'
            id='shipping'
            value={shipping}
            onChange={e => {
              setShipping(!shipping)
            }}
          />
        </div>
        <button className='btn btn-danger mt-4' onClick={resetAllFilters}>
          Clear Filters
        </button>
      </div>
    </aside>
  )
}

export default Filter
