import React from 'react'

const Categorie = ({ image, name, texte, btn }) => {
  const btndispo = btn ? (<button type="button" className='btn1'> <span>{btn} <i className="bi bi-arrow-right"></i></span></button>) : null
  return (
    <div>
      <img src={image} className="img-fluid" alt="..." />
      <div className='pt-5'>
        <h5>{name}</h5>
        <p>{texte}</p>
        {btndispo}
      </div>
    </div>
  )
}

export default Categorie