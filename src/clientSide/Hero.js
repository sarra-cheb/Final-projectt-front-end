import React from 'react';
import logo5 from '../images/logo5.jpg'
import logo6 from '../images/logo6.jpg'
import logo7 from '../images/logo7.jpg'
import Categorie from '../components/categorie';
const Hero = () => {
  return (
    <div className='pt-5'>
      <div style={{ height: '200px' }}>
        <h1>Categories</h1>
        <p>Find what you are looking for</p>
      </div>
      <div className=' bloc3 row d-flex align-items-center'>
        <div className='col-lg-4 col-sm-12 image5'>
          <Categorie image={logo5} name='Natural Plants' />
        </div>
        <div className='col-lg-4 col-sm-12 image6'>
          <Categorie image={logo6} name='Plant Accesoires' texte='Horem ipsum dolor sit amet, consectetur adipiscing elit.' btn='Explore' />

        </div>
        <div className='col-lg-4 col-sm-12 image7'>
          <Categorie image={logo7} name='Artificial Plants' />
        </div>
      </div>
    </div>
  )
}
export default Hero