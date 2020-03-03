import { createSelector } from 'reselect'
import { createActions, handleActions } from 'redux-actions'
import axios from 'axios'
import getEnv from '../environments'

const { API } = getEnv()

const defaultState = {
  selectedItem: null,
  items: {},
  ids: [],
  authors: [],
  categories: [],
  loadingItems: false
}

/** ACTIONS */

const actionsCreator = createActions({

  ITEM: {
    SET_LOADING_ITEMS: ({ loading }) => {
      return { loading }
    },
    FETCH_SELECTED_ITEM: ({ item }) => {
      return { item }
    },
    FETCH_ITEMS: ({ items: initialItems }) => {
      const { items, authors, categories, ids } = initialItems.reduce((current, item) => {
        const { author, items: currentItems, categories: currentCategories } = item
        const itemsMap = {}
        const currentIds = []

        for (let i = 0; i < currentItems.length; i++) {
          const id = currentItems[i].id
          itemsMap[id] = currentItems[i]
          currentIds.push(id)
        }

        return {
          ids: [
            ...current.ids,
            ...currentIds
          ],
          items: {
            ...current.items,
            ...itemsMap
          },
          authors: [
            ...current.authors,
            {
              ...author,
              items: currentIds
            }
          ],
          categories: [
            ...current.categories,
            {
              labels: currentCategories,
              items: currentIds
            }
          ]
        }
      }, { authors: [], items: {}, ids: [], categories: [] })

      return { items, authors, ids, categories }
    }
  }

})

const {
  fetchItems,
  fetchSelectedItem,
  setLoadingItems
} = actionsCreator.item

const actions = {

  getItem: ({ id = '' }) => async dispatch => {
    dispatch(setLoadingItems({ loading: true }))

    try {
      const { data } = await axios.get(`${API}/items/${id}`)

      dispatch(fetchSelectedItem({ item: data.results }))
      dispatch(setLoadingItems({ loading: false }))

      return data
    } catch (e) {
      console.log(e)
      dispatch(setLoadingItems({ loading: false }))
      throw e
    }
  },

  getItems: ({ query = '' }) => async dispatch => {
    dispatch(setLoadingItems({ loading: true }))

    try {
      const { data } = await axios.get(`${API}/items?q=${query}`)

      dispatch(fetchItems({ items: data.results }))
      dispatch(setLoadingItems({ loading: false }))

      return data
    } catch (e) {
      console.log(e)
      dispatch(setLoadingItems({ loading: false }))
      throw e
    }
  }

}

/** SELECTORS */

const items = createSelector(
  state => state.item,
  item => item.ids
    .map(id => item.items[id])
)

const selectedItem = createSelector(
  state => state.item,
  itemState => itemState.selectedItem
)

const authors = createSelector(
  state => state.item,
  itemState => itemState.authors
)

const getItemAuthor = state => idItem => createSelector(
  authors,
  (_, idItem) => idItem,
  (data, idItem) => data.find(author => author.items.some(id => id === idItem))
)(state, idItem)

const categories = createSelector(
  state => state.item,
  itemState => itemState.categories,
)

const getItemCategories = state => idItem => createSelector(
  categories,
  (_, idItem) => idItem,
  (data, idItem) => {
    const category = data.find(c => c.items.some(id => id === idItem));
    return category ? category.labels : []
  }
)(state, idItem)

const loadingItems = createSelector(
  state => state.item,
  itemState => itemState.loadingItems,
)

const selectors = {
  items,
  selectedItem,
  authors,
  getItemAuthor,
  categories,
  getItemCategories,
  loadingItems
}

/** REDUCER */

const reducer = handleActions(
  {
    [fetchItems]: (state, { payload: { items, authors, ids, categories } }) => {
      return {
        ...state,
        ids,
        items,
        authors,
        categories
      }
    },
    [fetchSelectedItem]: (state, { payload: { item } }) => {
      if (!item) {
        return { ...state, item: null }
      }

      return {
        ...state,
        selectedItem: item
      }
    },
    [setLoadingItems]: (state, { payload: { loading } }) => {
      return {
        ...state,
        loadingItems: loading
      }
    }
  },
  defaultState
)

export default {
  actions,
  reducer,
  selectors
}
