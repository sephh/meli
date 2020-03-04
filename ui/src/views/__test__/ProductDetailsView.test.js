import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { MemoryRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import axiosMock from 'axios'
import { render, waitForElement, wait } from '@testing-library/react'

import reducers from '../../reducers'
import ProductDetailsView from '../ProductDetailsView'
import { ITEM_REDUCER_STATE } from '../../../__mock__/reducers.mock'
import { ITEM_RESPONSE_MOCK } from '../../../__mock__/item-response.mock'

import getEnv from '../../environments'

jest.mock('axios')

const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducers.item, initialState, applyMiddleware(thunk)) } = {}
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

    const { getByAltText, getByText } = renderWithRedux(ProductDetailsView, { initialState: { item: {...ITEM_REDUCER_STATE} } })

    expect(getByText('Estamos encontrando su producto...')).toBeInTheDocument()
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(`${env.API}/items/abc`)

    const image = await waitForElement(() => getByAltText(ITEM_REDUCER_STATE.selectedItem.item.title), { timeout: 4000 })

    expect(image).toBeInTheDocument()

  })
})
