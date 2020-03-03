import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Item from '../Item'
import item from '../../../reducers/item'

import { ITEM_REDUCER_STATE } from '../../../../__mock__/reducers.mock'
import price from '../../../filters/price'

describe('Item', () => {
  let renderResult
  let itemData

  beforeEach(() => {
    const [firstItem] = item.selectors.items({ item: ITEM_REDUCER_STATE })

    itemData = { ...firstItem }
    renderResult = render(<Item item={firstItem}/>, { wrapper: MemoryRouter })
  })

  test('should render image', () => {
    const { getByAltText } = renderResult

    const image = getByAltText(itemData.title)

    expect(image).toBeInTheDocument()
  })

  test('should render price', () => {
    const { getByText } = renderResult
    const priceText = `${itemData.price.currency} ${price(itemData.price.amount)}`

    const priceEl = getByText(priceText)

    expect(priceEl).toBeInTheDocument()
  })

  test('should render free shipping icon', () => {
    const { getByAltText } = renderResult

    const icon = getByAltText('Free Shipping')

    expect(icon).toBeInTheDocument()
  })

  test('should render state', () => {
    const { getByText } = renderResult

    const state = getByText(itemData.state_name)

    expect(state).toBeInTheDocument()
  })

  test('should render description', () => {
    const { getByText } = renderResult

    const description = getByText(itemData.title)

    expect(description).toBeInTheDocument()
  })
})
