import React from 'react';
import logo from '../images/logo1.png'
import BestSelling from './bestSelling';

import Hero from './Hero';
import Card from './Card';



const Home = () => {
  return (
    <div className='container-fluid'>
      <div className="row introduction">
        <div className="col-lg-6 left">
          <div className='mt-5' >
            <h1 className='titre'>Buy Your Dreams Plants</h1>
            <div className='row mt-3'>
              <div className='col-2'>
                <h3>50+</h3>
                <h4>Plant species</h4>
              </div>
              <div className='col-2'>
                <div className='vr' style={{ height: '64px' }}></div>
              </div>
              <div className='col-2'>
                <h3>100+</h3>
                <h4>Customers</h4>
              </div>
            </div>
          </div>
          <div className="input-group w-75">
            <input type="text" className="form-control me-2 " placeholder="What are you looking for?" />
            <div className="input-group-append">
              <button className="btn mt-2 me-2" style={{ backgroundColor: '#C1DCDC', width: '48px', height: '48px' }} type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 right">
          <div className='part1'>
            <img src={logo} className="image" alt="..." />
          </div>
        </div>
      </div>
      <div className="bestselling">
        <BestSelling />
      </div>
      <div className='mt-5'>
        <Card />
      </div>
      <div>
        <Hero />
      </div>
    </div>
  )
}
export default Home