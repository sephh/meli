import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import axiosMock from 'axios'
import { render, wait } from '@testing-library/react'

import reducers from '../../reducers'
import ProductDetailsView from '../ProductDetailsView'
import { ITEM_RESPONSE_MOCK } from '../../__mock__/item-response.mock'

import getEnv from '../../environments'
import item from '../../reducers/item'
import price from '../../filters/price'
import Router from 'next/router'
import { withTestRouter } from '../../__mock__/next-test-router'
import '../../styles/fontawesome'

jest.mock('axios')

const mockedRouter = {
  push: () => {
  }, prefetch: () => {
  }
}
Router.router = mockedRouter

const store = createStore(
  combineReducers({
    ...reducers
  }),
  applyMiddleware(thunk)
)

const renderWithRedux = (
  { ui: Component }
) => {
  return {
    ...render(<Provider store={store}>
      {withTestRouter(<Component/>, {
        route: '/items',
        pathname: '/items',
        query: { id: 'carabina' },
        asPath: '/items'
      })}
    </Provider>),
    store
  }
}

describe('ProductDetailsView', () => {
  test('should load and render product details', async () => {
    axiosMock.get.mockResolvedValueOnce(ITEM_RESPONSE_MOCK)

    const env = getEnv()

    const { getByAltText, getByText } = renderWithRedux({ ui: ProductDetailsView })

    expect(getByText('Estamos encontrando su producto...')).toBeInTheDocument()
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(`${env.API}/items/carabina`)

    // wait async process
    await wait(undefined, { timeout: 0 })

    const selectedItem = item.selectors.selectedItem(store.getState())
    const conditionText = `${selectedItem.item.condition} - ${selectedItem.item.sold_quantity} vendidos`
    const priceText = `${selectedItem.item.price.currency} ${price(selectedItem.item.price.amount)}`
    const [firstParagraph] = selectedItem.item.description.split(/(?:\r\n|\r|\n)/g)

    const image = getByAltText(selectedItem.item.title)
    const condition = getByText(conditionText)
    const detail = getByText(selectedItem.item.title)
    const priceEl = getByText(priceText)
    const button = getByText('Comprar')
    const descriptionTitle = getByText('Descripción del produto')
    const description = getByText(firstParagraph, { exact: false })

    expect(image).toBeInTheDocument()
    expect(condition).toBeInTheDocument()
    expect(detail).toBeInTheDocument()
    expect(priceEl).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(descriptionTitle).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})
