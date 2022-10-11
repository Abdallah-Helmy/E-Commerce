import React, { useState } from 'react'
import './SingleProductView.css'

function Imgs ({ images = [[{}]] }) {
  const [main, setMain] = useState(images[0])

  return (
    <div className='imgs mt-2'>
      <img src={main.url} alt='' />
      <div className='switched-imgs d-flex justify-content-between'>
        {images.map((img, index) => {
          return (
            <img
              src={img.url}
              key={index}
              alt=''
              className={main.url === img.url ? 'active' : null}
              style={{
                width: '80px',
                height: '70px',
                margin: '15px 0',
                padding: '2px'
              }}
              onClick={() => setMain(img)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Imgs
