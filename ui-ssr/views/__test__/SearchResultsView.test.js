import React from 'react'
import { render, wait } from '@testing-library/react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import Router from 'next/router'

import thunk from 'redux-thunk'
import axiosMock from 'axios'

import reducers from '../../reducers'
import SearchResultsView from '../SearchResultsView'
import { ITEM_LIST_RESPONSE_1 } from '../../__mock__/item-response.mock'
import { withTestRouter } from '../../__mock__/next-test-router'
import getEnv from '../../environments'
import item from '../../reducers/item'
import price from '../../filters/price'
import '../../styles/fontawesome'

const mockedRouter = {
  push: () => {
  }, prefetch: () => {
  }
}
Router.router = mockedRouter

jest.mock('axios')

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
        query: { search: 'carabina' },
        asPath: '/items'
      })}
    </Provider>),
    store
  }
}

describe('SearchResultsView', () => {
  async function listTestBuilder({ getByAltText, getByText }) {
    // wait async store process
    await wait(undefined, { timeout: 0 })

    const [firstItem] = item.selectors.items(store.getState())
    const priceText = `${firstItem.price.currency} ${price(firstItem.price.amount)}`

    const image = getByAltText(firstItem.title)
    const priceEl = getByText(priceText)
    const icon = getByAltText('Free Shipping')
    const state = getByText(firstItem.state_name)
    const description = getByText(firstItem.title)

    expect(image).toBeInTheDocument()
    expect(priceEl).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
    expect(state).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  }

  test('should load and render a list of products', async () => {
    axiosMock.get.mockResolvedValueOnce(ITEM_LIST_RESPONSE_1)

    const env = getEnv()

    const { getByText, getByAltText } = renderWithRedux({ ui: SearchResultsView })

    expect(getByText('Estamos encontrando su producto...')).toBeInTheDocument()
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(`${env.API}/items?q=carabina`)

    await listTestBuilder({ getByText, getByAltText })
  })
})
