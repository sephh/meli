import React from 'react'
import Link from 'next/link'

const ItemNotFound = () => {
  return (
    <div className='item-not-found'>
      <div className='text-center'>
        <span
          className="fas fa-5x fa-exclamation-triangle"
          data-testid="warningIcon"
        />
      </div>

      <div className='text-center item-not-found__message'>
        Parece que esta página no existe
      </div>

      <div className='text-center'>
        <Link href={'/'}><a>Ir a casa</a></Link>
      </div>
    </div>
  )
}

export default ItemNotFound
