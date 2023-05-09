import React from 'react'

const Card = () => {
  return (
    <div className="pt-5" >
      <div className="card text-center ">
        <div style={{ height: '87px' }}>
          <h1 className="card-title"> About Us </h1>
          <h5>Order now and appreciate the beauty of nature</h5>
        </div>
        <div className='row' style={{ height: '213px' }}>
          <div className="card-body col-3">
            <div className='bibi'>
              <i className="bi bi-flower2"></i>
            </div>
            <h4 className="card-text pt-5">Large Assortment</h4>
            <p className=" mt-3">we offer many different types of products with fewer variations in each category.</p>
          </div>
          <div className="card-body col-3">
            <div className='bibi'>
              <i className="bi bi-box-seam"></i>
            </div>
            <h4 className="card-text pt-5">Fast & Free Shipping</h4>
            <p className=" mt-3">4-day or less delivery time, free shipping and an expedited delivery option.</p>
          </div>
          <div className="card-body col-3">
            <div className='bibi'>
              <i className="bi bi-telephone-forward"></i>
            </div>
            <h4 className="card-text pt-5">24/7 Support</h4>
            <p className="mt-3"> answers to any business related inquiry 24/7 and in real-time.</p>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}
export default Card