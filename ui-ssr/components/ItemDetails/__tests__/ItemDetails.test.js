import React from 'react'
import { render } from '@testing-library/react'
import { ITEM_REDUCER_STATE } from '../../../__mock__/reducers.mock'
import ItemDetails from '../ItemDetails'
import price from '../../../filters/price'

describe('ItemDetails', () => {
  let item

  beforeEach(() => {
    item = ITEM_REDUCER_STATE.selectedItem
  })

  test('should render image', () => {
    const { getByAltText } = render(<ItemDetails item={item}/>)

    const image = getByAltText(item.item.title)

    expect(image).toBeInTheDocument()
  })

  test('should render condition', () => {
    const { getByText } = render(<ItemDetails item={item}/>)
    const conditionText = `${item.item.condition} - ${item.item.sold_quantity} vendidos`

    const condition = getByText(conditionText)

    expect(condition).toBeInTheDocument()
  })

  test('should render item detail', () => {
    const { getByText } = render(<ItemDetails item={item}/>)

    const detail = getByText(item.item.title)

    expect(detail).toBeInTheDocument()
  })

  test('should render price', () => {
    const { getByText } = render(<ItemDetails item={item}/>)

    const priceText = `${item.item.price.currency} ${price(item.item.price.amount)}`

    const priceEl = getByText(priceText)

    expect(priceEl).toBeInTheDocument()
  })

  test('should render button "Comprar"', () => {
    const { getByText } = render(<ItemDetails item={item}/>)

    const button = getByText('Comprar')

    expect(button).toBeInTheDocument()
  })

  test('should render description title', () => {
    const { getByText } = render(<ItemDetails item={item}/>)

    const descriptionTitle = getByText('Descripción del produto')

    expect(descriptionTitle).toBeInTheDocument()
  })

  test('should render description', () => {
    const { getByText } = render(<ItemDetails item={item}/>)
    const [firstParagraph] = item.item.description.split(/(?:\r\n|\r|\n)/g)

    const description = getByText(firstParagraph, { exact: false })

    expect(description).toBeInTheDocument()
  })
})
