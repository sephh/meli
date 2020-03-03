import React from 'react'
import PropTypes from 'prop-types'

import freeShippingImage from '../../assets/img/ic_shipping.png'
import { Link } from 'react-router-dom'
import price from '../../filters/price'

const Item = ({ item }) => {
  const handleFreeShipping = () => {
    if (item.free_shipping) {
      return (
        <span className='item__free-shipping'>
          <img src={freeShippingImage} alt={'Free Shipping'}/>
        </span>
      )
    }

    return null
  }

  return (
    <Link to={`/items/${item.id}`} className='item'>

      <div className='item__image'>

        <img src={item.picture} alt={item.title}/>

      </div>

      <div className='item__content'>

        <div className='item__content-header'>

          <div className='item__content-price'>
            {item.price.currency} {price(item.price.amount)}

            {handleFreeShipping()}
          </div>

          <div className='item__content-state'>
            {item.state_name}
          </div>

        </div>

        <div className='item__content-body'>
          {item.title}
        </div>

      </div>

    </Link>
  )
}

export const ItemPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.string,
    decimals: PropTypes.number
  }),
  picture: PropTypes.string,
  state_name: PropTypes.string,
  condition: PropTypes.string,
  free_shipping: PropTypes.bool
})

Item.propTypes = {
  item: ItemPropTypes
}

export default Item
