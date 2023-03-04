import React from 'react'

const Images = ({ images }) => {
  return (
    <div>
        {
          images && <img style={{ height: 300, width: 400, objectFit: 'cover' }} src={images[0]} />
        }
    </div>
  )
}

export default Images;