import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { MemoryRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import axiosMock from 'axios'
import { render, waitForElement } from '@testing-library/react'

import reducers from '../../reducers'
import ProductDetailsView from '../ProductDetailsView'
import { ITEM_RESPONSE_MOCK } from '../../../__mock__/item-response.mock'

import getEnv from '../../environments'

jest.mock('axios')

const renderWithRedux = (
  ui,
  { store = createStore(
    combineReducers({
      ...reducers
    }),
    applyMiddleware(thunk),
  ) } = {}
) => {
  return {
    ...render(<Provider store={store}>
      <MemoryRouter initialEntries={['/items/abc']} initialIndex={0}>
        <Route path={'/items/:id'} component={ui}/>
      </MemoryRouter>
    </Provider>),
    store
  }
}

describe('ProductDetailsView', () => {
  test('should render product image', async () => {
    axiosMock.get.mockResolvedValueOnce(ITEM_RESPONSE_MOCK)

    const env = getEnv()

    const { getByAltText, getByText } = renderWithRedux(ProductDetailsView)

    expect(getByText('Estamos encontrando su producto...')).toBeInTheDocument()
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(`${env.API}/items/abc`)

    const image = await waitForElement(() => getByAltText(ITEM_RESPONSE_MOCK.data.results.item.title))

    expect(image).toBeInTheDocument()

  })
})
