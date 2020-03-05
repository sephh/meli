import React from 'react'
import { render } from '@testing-library/react'

import item from '../../../reducers/item'
import { ITEM_REDUCER_STATE } from '../../../__mock__/reducers.mock'
import ItemsCard from '../ItemsCard'

describe('ItemsCard', () => {
  test('should render all items', () => {
    const items = item.selectors.items({ item: ITEM_REDUCER_STATE })
    const { getByText } = render(<ItemsCard items={items}/>)

    items.forEach((itemData) => {
      const description = getByText(itemData.title.trim(), { exact: false })

      expect(description).toBeInTheDocument()
    })
  })
})
