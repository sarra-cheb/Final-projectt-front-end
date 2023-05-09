import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='container-fluid mt-5' style={{ backgroundColor: "#C1DCDC" }}>
      <div className="row pt-5 d-flex justify-content-center" >
        <div className='col-6 text-start'>
          <Link className="navbar-brand px-5" style={{ fontFamily: 'Quella' }} href="#">CREENMIND</Link>
          <p style={{ width: '189px', height: '54px', margin: '20px' }}>We help you find your dream plant</p>
          <div className="row ps-3 mt-3">
            <div className="col-2 link-secondary">
              <Link href="" className=" ">
                <i className="bi bi-facebook"></i>
              </Link>
            </div>
            <div className="col-2 link-secondary">
              <Link href="" className=" ">
                <i className="bi bi-instagram"></i>
              </Link>
            </div>
            <div className="col-2 link-secondary">
              <Link href="" className=" ">
                <i className="bi bi-twitter "></i>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-6 bloc5'>
          <div className='row d-flex justify-content-around'>
            <div className="col-2 ">
              <h6 className="text-uppercase fw-bold mb-4">
                Information
              </h6>
              <p>
                <Link href="#!" className="text-reset">About</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Product</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">BLog</Link>
              </p>
            </div>

            <div className="col-2 ">

              <h6 className="text-uppercase fw-bold mb-4">
                Company
              </h6>
              <p>
                <Link to="#!" className="text-reset">Community</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Carrer</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Our story</Link>
              </p>
            </div>

            <div className="col-2 ">

              <h6 className="text-uppercase fw-bold mb-4">
                Contact
              </h6>
              <p>
                <Link href="#!" className="text-reset">Getting started</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Pricing</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Ressources</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-start p-4">
          <p> 2023 all Right Reserved Term of use GREENMIND   </p>

        </div>
      </div>
    </div>
  )
}
export default Footer