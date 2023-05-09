import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand me-5" style={{ fontFamily: 'Quella' }} href="#">CREENMIND</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link ">Contacts</Link>
            </li>
          </ul>
        </div>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
        </form>
        <div className='part2'>
          <ul>
            <Link><i className="bi bi-cart2 me-5"></i></Link>
            <div className="nav-item dropdown me-3">
              <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person"></i></Link>
              <ul className="dropdown-menu text-center ">
                <p>Welcome back!</p>
                <li> <Link className="btn btnlogin mb-2" to='/login'>Sign in</Link></li>
                <li> <Link className="btn btnregister" to='/register'>Join for free</Link></li>
              </ul>
            </div>
            <div className="vr me-5"></div>
            <Link><i className="bi bi-filter-right"></i></Link>
          </ul>
        </div>
      </div>
    </nav >
  )
}
export default Navbar