import React from 'react'
import Link from 'next/link'

import {
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ItemNotFound = () => {
  return (
    <div className='item-not-found'>
      <div className='text-center' data-testid="warningIcon">
        <FontAwesomeIcon
          color={"#999"}
          icon={faExclamationTriangle}
          size={'5x'}
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
