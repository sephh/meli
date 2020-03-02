import React from 'react'
import PropTypes from 'prop-types'
import price from '../../filters/price'

const ItemDetails = ({ item }) => {
  const description = () => {
    return {__html: item.item.description.replace(/(?:\r\n|\r|\n)/g, '<br>')};
  }

  return (
    <div className='item-details'>

      <div className='item-details__body'>

        <div className='item-details__body-image'>
          <img src={item.item.picture} alt={item.item.title}/>
        </div>

        <div className='item-details__body-details'>

          <div className='item-details__body-details-condition'>
            {item.item.condition} - {item.item.sold_quantity} vendidos
          </div>

          <div className='item-details__body-details-author text-capitalize'>
            <p>{item.item.title}</p>
          </div>

          <div className='item-details__body-details-price'>
            {item.item.price.currency} {price(item.item.price.amount)}
          </div>

          <button
            className='ml-btn ml-btn--md ml-btn--block ml-btn--primary'
          >
            Comprar
          </button>

        </div>

      </div>

      <div className='item-details__footer'>

        <div className='item-details__footer-title'>
          Descripción del produto
        </div>

        <div className='item-details__footer-description' dangerouslySetInnerHTML={description()}>
        </div>

      </div>
    </div>
  )
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string,
      lastname: PropTypes.string
    }),
    categories: PropTypes.array,
    item: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.shape({
        amount: PropTypes.number,
        currency: PropTypes.string,
        decimals: PropTypes.number
      }),
      picture: PropTypes.string,
      condition: PropTypes.string,
      free_shipping: PropTypes.bool,
      sold_quantity: PropTypes.number,
      description: PropTypes.string
    })
  })
}

export default ItemDetails
