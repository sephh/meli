import React from 'react'
import PropTypes from 'prop-types'
import Item, { ItemPropTypes } from './Item'

const ItemsCard = ({ items }) => {
  return (
    <div className='items-card'>
      {
        items.map(item => (
          <Item
            key={item.id}
            item={item}
          />
        ))
      }
    </div>
  )
}

ItemsCard.propTypes = {
  items: PropTypes.arrayOf(ItemPropTypes)
}

ItemsCard.defaultProps = {
  items: []
}

export default ItemsCard
