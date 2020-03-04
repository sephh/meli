import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import axiosMock from 'axios'

import { ITEM_REDUCER_STATE } from '../../../__mock__/reducers.mock'
import reducers from '../index'
import item, { parseItems } from '../item'
import { ITEM_LIST_RESPONSE_1, ITEM_RESPONSE_MOCK } from '../../../__mock__/item-response.mock'
import getEnv from '../../environments'

jest.mock('axios')


describe('item reducer', () => {
  let store

  beforeEach(() => {
    jest.clearAllMocks()
    store = createStore(
      combineReducers({
        ...reducers
      }),
      {
        item: ITEM_REDUCER_STATE
      },
      applyMiddleware(thunk)
    )
  })

  test('should have correct initial state', () => {
    const initialState = store.getState()

    expect(initialState).toEqual({ item: ITEM_REDUCER_STATE })
  })

  test('should dispatch getItem', async () => {
    axiosMock.get.mockResolvedValueOnce(ITEM_RESPONSE_MOCK)

    await store.dispatch(item.actions.getItem({ id: '123' }))

    const currentState = store.getState()

    expect(currentState.item.selectedItem).toEqual(ITEM_RESPONSE_MOCK.data.results)
    expect(axiosMock.get).toBeCalledTimes(1)
    expect(axiosMock.get).toBeCalledWith(`${getEnv().API}/items/123`)
  })

  test('should dispatch getItems', async () => {
    axiosMock.get.mockResolvedValueOnce(ITEM_LIST_RESPONSE_1)

    await store.dispatch(item.actions.getItems({ query: 'carabina' }))

    const { items } = parseItems({ items: ITEM_LIST_RESPONSE_1.data.results })
    const currentState = store.getState()

    expect(currentState.item.items).toEqual(items)
    expect(axiosMock.get).toBeCalledTimes(1)
    expect(axiosMock.get).toBeCalledWith(`${getEnv().API}/items?q=carabina`)
  })

  test('should dispatch set loading', async () => {
    store.dispatch(item.actions.setLoadingItems({ loading: true }))

    let currentState = store.getState()

    expect(currentState.item.loadingItems).toBe(true)

    store.dispatch(item.actions.setLoadingItems({ loading: false }))

    currentState = store.getState()

    expect(currentState.item.loadingItems).toBe(false)
  })

  test('should select selectedItem', () => {
    const selectedItem = item.selectors.selectedItem(store.getState())

    expect(selectedItem).toEqual(ITEM_REDUCER_STATE.selectedItem)
  })

  test('should select loadingItems', () => {
    const loading = item.selectors.loadingItems(store.getState())

    expect(loading).toEqual(ITEM_REDUCER_STATE.loadingItems)
  })

  test('should select items', () => {
    const items = item.selectors.items(store.getState())

    expect(items).toEqual(
      ITEM_REDUCER_STATE.ids.map(id => ITEM_REDUCER_STATE.items[id])
    )
  })

})
