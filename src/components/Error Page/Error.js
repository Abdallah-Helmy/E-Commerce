import React from 'react'
import './error.css'
import { useNavigate } from 'react-router-dom'

function Error () {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <h1 className='text-center'>Error 404</h1>
      <h1 className='text-center my-3'>Page Not Found</h1>
      <h1 className='text-center'>
        <button
          className='btn btn-danger'
          onClick={() => navigate('/E-Commerce')}
        >
          Back To Products
        </button>
      </h1>
    </div>
  )
}

export default Error
