import React, { useEffect, useState } from 'react'
import './products.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from './productsSlice'
import Filter from '../../components/filter/Filter'
import Items from '../../components/items/Items'

export const ProductsView = () => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.products)

  const [categories, setCategories] = useState([])
  const [companies, setCompanies] = useState([])
  const [colors, setColors] = useState([])

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  useEffect(() => {
    const uniqueCategories = ['all', ...new Set(items.map(el => el.category))]
    setCategories([...uniqueCategories])

    const uniqueCompanies = ['all', ...new Set(items.map(el => el.company))]
    setCompanies([...uniqueCompanies])

    const uniqueColors = ['all', ...new Set(items.map(el => el.colors[0]))]
    setColors([...uniqueColors])
  }, [loading])

  return (
    <>
      {loading && <h1 className='text-center'>Loading...</h1>}
      {!loading && error ? <h1>Error: {error}</h1> : null}
      {!loading ? (
        <>
          <div className='container'>
            <div className='row w-100 m-0 mt-5 d-flex flex-nowrap'>
              <Filter
                categories={categories}
                companies={companies}
                colors={colors}
              />
              {items.length ? (
                <Items items={items} />
              ) : (
                <h1 className='col-10 text-center text-capitalize'>
                  no products matched your filter.
                </h1>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
