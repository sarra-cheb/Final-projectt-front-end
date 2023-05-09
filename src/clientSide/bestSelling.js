import React, { Component } from 'react';
import logo2 from '../images/logo2.jpg'
import logo3 from '../images/logo3.jpg'
import logo4 from '../images/logo4.jpg'
import Selling from '../components/selling';
class BestSelling extends Component {
  render() {


    return (
      <div className='row mt-5'>
        <div className='col-lg-3 col-sm-12'>
          <h1 className='titre2'>Best Selling Plants</h1>
          <p className='text-start' style={{ width: '196px', height: '81px' }}>Easiest way to healthy life by buying your favorite plants </p>
          <div className='btn2'>
            <button type="button" className='btn'> <span>See more <i className="bi bi-arrow-right"></i></span></button>
          </div>
        </div>
        <div className='col-lg-3 col-sm-12'>
          <Selling image={logo2} name='Natural Plants' price='₱ 1,400.00' />
        </div>
        <div className='col-lg-3 col-sm-12'>
          <Selling image={logo3} name='Artificial Plants' price='₱ 900.00' />
        </div>
        <div className='col-lg-3 col-sm-12'>
          <Selling image={logo4} name='Artificial Plants' price='₱ 3,400.00' />
        </div>
      </div>
    )
  }
}
export default BestSelling