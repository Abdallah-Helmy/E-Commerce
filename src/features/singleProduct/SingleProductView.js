import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSingleProduct } from './SingleProductslice'
import { useSelector, useDispatch } from 'react-redux'
import './SingleProductView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  addToCart,
  addProduct,
  addAmountOfProducts,
  totalPrice,
  totalPricesOfAllCartProducts
} from './SingleProductslice'
import Imgs from './Imgs'
import AvailableColors from './AvailableColors'

function SingleProductView () {
  const { productId } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { singleProduct, loading, error } = useSelector(
    state => state.singleProduct
  )

  const [counter, setCounter] = useState(1)

  useEffect(() => {
    dispatch(fetchSingleProduct(productId))
  }, [productId])

  const { name, price, description, company, images, colors } = singleProduct

  return (
    <>
      {loading && <h1 className='text-center'>Loading...</h1>}
      {!loading && error ? <h1>Error: {error}</h1> : null}
      {!loading ? (
        <>
          <div className='container d-flex justify-content-center align-items-center'>
            <div className='singleProductDetails w-100 mt-5'>
              <button
                className='btn text-capitalize'
                onClick={() => navigate('/E-Commerce')}
              >
                back to products
              </button>
              <div className='productDetails d-flex'>
                <Imgs images={images} />
                <div className='product-info w-75 ms-5'>
                  <h1>{name}</h1>
                  <h4>${price}</h4>
                  <p>{description}</p>

                  <h3>
                    <span>Available:</span> In Stock
                  </h3>
                  <h3>
                    <span>Brand:</span> {company}
                  </h3>
                  <hr />
                  <AvailableColors colors={colors} />
                  <div className='addToCart'>
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={() =>
                        counter > 1 ? setCounter(prev => prev - 1) : null
                      }
                    />
                    <span className='mx-3'>{counter}</span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => setCounter(prev => prev + 1)}
                    />
                  </div>
                  <button
                    className='btn mt-3 text-capitalize'
                    onClick={() => {
                      dispatch(addProduct(singleProduct))
                      dispatch(
                        addAmountOfProducts({ amount: counter, index: -1 })
                      )
                      navigate('/E-Commerce/cart')
                      dispatch(
                        totalPrice({
                          amount: counter,
                          price,
                          type: 'ADD_TO_CART'
                        })
                      )
                      dispatch(addToCart(counter))
                      dispatch(totalPricesOfAllCartProducts())
                    }}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default SingleProductView
