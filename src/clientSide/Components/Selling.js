import React from 'react'

const Selling = ({ image, name, price }) => {
  return (
    <div>
      <img src={image} className="image2 img-fluid" alt="..." />
      <div className='text-start'>
        <h5>{name}</h5>
        <p>{price}</p>
      </div>
    </div>
  )

}
export default Selling 