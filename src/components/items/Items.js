import React from 'react'
import './items.css'
import '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Items ({ items }) {
  return (
    <>
      <div className='items-contaienr col-10'>
        <h6 className='mb-3'>{items.length} Product Found </h6>
        <div className='items'>
          {items.map(item => {
            const { id, image, name, price } = item
            return (
              <div className='item' key={id}>
                <div className='img'>
                  <img src={image} alt={name} />
                  <Link to={`/E-Commerce/${id}`}>
                    <div className='item-details'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                  </Link>
                </div>
                <div className='info d-flex justify-content-between align-items-center mt-2'>
                  <p className='text-capitalize'>{name}</p>
                  <p>${price}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Items
