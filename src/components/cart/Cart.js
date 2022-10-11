import React from 'react'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addToCart,
  totalPrice,
  totalPricesOfAllCartProducts,
  deleteItem,
  addAmountOfProducts,
  clearCart
} from '../../features/singleProduct/SingleProductslice'
import './cart.css'

function Cart () {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {
    cartItems,
    cartItemsAmounts,
    totalPriceOfProducts,
    totalPriceOfAllCartProducts
  } = useSelector(state => state.singleProduct)

  return cartItems.length ? (
    <div className='container'>
      <div className='about-product mt-4'>
        <h5>Item</h5>
        <h5>Price</h5>
        <h5>Quantity</h5>
        <h5>Subtotal</h5>
      </div>

      <div className='products'>
        {cartItems.map((item, index) => {
          const { id, name, price, images, colors } = item
          return (
            <React.Fragment key={id}>
              <hr />
              <div className='product'>
                <div className='info d-flex align-items-center'>
                  <img
                    src={images[0].url}
                    alt={name}
                    style={{ width: '70px', height: '70px' }}
                  />
                  <div className='product-name text-capitalize ms-2'>
                    <h5>{name}</h5>
                    <h6>
                      <span>Color:</span>
                      <span
                        className='color'
                        style={{ backgroundColor: `${colors[0]}` }}
                      ></span>
                    </h6>
                  </div>
                </div>
                <h5 className='price'>${price}</h5>
                <div className='inc-dec'>
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={() => {
                      if (cartItemsAmounts[index] > 1) {
                        dispatch(addAmountOfProducts({ amount: -1, index }))
                        dispatch(addToCart(-1))
                        dispatch(
                          totalPrice({
                            amount: cartItemsAmounts[index] - 1,
                            price,
                            index
                          })
                        )
                        dispatch(totalPricesOfAllCartProducts())
                      }
                    }}
                  />
                  <span className='mx-3'>{cartItemsAmounts[index]}</span>
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={() => {
                      dispatch(addAmountOfProducts({ amount: 1, index }))
                      dispatch(addToCart(1))
                      dispatch(
                        totalPrice({
                          amount: cartItemsAmounts[index] + 1,
                          price,
                          index
                        })
                      )
                      dispatch(totalPricesOfAllCartProducts())
                    }}
                  />
                </div>
                <h5 className='total'>${totalPriceOfProducts[index]}</h5>
                <div
                  className='btn btn-danger'
                  onClick={() => {
                    dispatch(deleteItem(index))
                    dispatch(totalPricesOfAllCartProducts())
                  }}
                >
                  Delete
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <hr />
      <div className='clearAndContinue d-flex justify-content-between mb-4'>
        <button
          className='btn main-btn'
          onClick={() => navigate('/E-Commerce')}
        >
          Continue Shopping
        </button>
        <div className='totalPricesOfProducts bg-success'>
          Total: ${totalPriceOfAllCartProducts}
        </div>
        <button className='btn btn-dark' onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  ) : (
    <div className='text-center'>
      <h1 className='empty text-center'>Your cart is empty</h1>
      <button className='btn main-btn' onClick={() => navigate('/E-Commerce')}>
        Fill It
      </button>
    </div>
  )
}

export default Cart
