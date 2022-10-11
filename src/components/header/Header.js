import React from 'react'
import './header.css'
import logo from '../../assets/logo.221f6b13.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header () {
  const { counter } = useSelector(state => state.singleProduct)
  const navigate = useNavigate()

  return (
    <>
      <div className='container py-4 d-flex justify-content-between align-items-center'>
        <Link to={'/E-Commerce'}>
          <img src={logo} alt='logo' />
        </Link>
        <div
          className='cart d-flex align-items-center'
          onClick={() => navigate('/E-Commerce/cart')}
        >
          <h3 className='m-0 me-2'>Cart</h3>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            style={{ width: '30px' }}
          >
            <path d='M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z' />
          </svg>
          <div className='amount'>{counter}</div>
        </div>
      </div>
    </>
  )
}

export default Header
