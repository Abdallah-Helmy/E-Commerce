import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './SingleProductView.css'

function AvailableColors ({ colors = [] }) {
  return (
    <div className='available-colors'>
      <h3>Colors:</h3>
      <div className='color' style={{ backgroundColor: `${colors[0]}` }}>
        <FontAwesomeIcon icon={faCheck} />
      </div>
    </div>
  )
}

export default AvailableColors
