import React from 'react'
import { Link } from 'react-router-dom'

const ItemNotFound = () => {
  return (
    <div className='item-not-found'>
      <div className='text-center'>
        <span className="fas fa-5x fa-exclamation-triangle"/>
      </div>

      <div className='text-center item-not-found__message'>
        Parece que esta página no existe
      </div>

      <div className='text-center'>
        <Link to={'/'}>Ir a casa</Link>
      </div>
    </div>
  )
}

export default ItemNotFound
