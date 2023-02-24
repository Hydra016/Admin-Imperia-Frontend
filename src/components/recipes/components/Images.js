import React from 'react'

const Images = ({ images }) => {
  return (
    <div>
        {
            // images && images.map(image => <img style={{ height: 100, width: 100 }} src={image} />)
            images && <img style={{ height: 300, width: 400, objectFit: 'cover' }} src={images[0]} />
        }
    </div>
  )
}

export default Images;