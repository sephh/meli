import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { MemoryRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import axiosMock from 'axios'

import SearchBarView from '../SearchBarView'

import reducers from '../../reducers'
import SearchResultsView from '../SearchResultsView'
import { ITEM_LIST_RESPONSE_1, ITEM_LIST_RESPONSE_2 } from '../../../__mock__/item-response.mock'
import getEnv from '../../environments'
import item from '../../reducers/item'
import price from '../../filters/price'

jest.mock('axios')

const store = createStore(
  combineReducers({
    ...reducers
  }),
  applyMiddleware(thunk)
)

const renderWithRedux = (
  ui
) => {
  return {
    ...render(<Provider store={store}>
      <MemoryRouter initialEntries={['/items?search=carabina']} initialIndex={0}>
        <Route path={'/'} component={SearchBarView}/>
        <Route path={'/items'} component={ui}/>
      </MemoryRouter>
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

    const { getByText, getByPlaceholderText, getByTestId, getByAltText } = renderWithRedux(SearchResultsView)

    expect(getByText('Estamos encontrando su producto...')).toBeInTheDocument()
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(`${env.API}/items?q=carabina`)

    await listTestBuilder({ getByText, getByAltText })

    // Change search
    const searchInput = getByPlaceholderText('Nunca dejes de buscar')
    fireEvent.change(searchInput, { target: { value: 'peixeira' } })

    // wait delayed input
    await wait(undefined, { timeout: 0 })

    axiosMock.get.mockResolvedValueOnce(ITEM_LIST_RESPONSE_2)

    fireEvent.submit(getByTestId('form'))

    expect(getByText('Estamos encontrando su producto...')).toBeInTheDocument()
    expect(axiosMock.get).toHaveBeenCalledTimes(2)
    expect(axiosMock.get).toHaveBeenCalledWith(`${env.API}/items?q=peixeira`)

    await listTestBuilder({ getByText, getByAltText })
  })
})
