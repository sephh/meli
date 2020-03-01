import { createSelector } from 'reselect'
import { normalize } from 'normalizr'
import { createActions, handleActions } from 'redux-actions'
import _ from 'lodash'

const defaultState = {
  selectedItem: null,
  items: {},
  ids: []
}

/** ACTIONS */

const actionsCreator = createActions({

  ITEM: {
    FETCH_SELECTED_ITEM: ({ item }) => {
    },
    FETCH_ITEMS: ({ items }) => {
      if (!items) {
        return { items: null }
      }
      return { items, ids: Object.keys(items) }
    }
  }

})

const {
  fetchItems,
  fetchSelectedItem
} = actionsCreator.item

const actions = {

  getItem: (variables = {}) => async dispatch => {
    try {
      dispatch(updateRequestStatus({ requestStatus: enums.requestStatus.Loading }))

      const { entities } = await dao.getItems(variables)
        .then(res => normalize(res.data.Me, USER_SCHEMA))
      const { items } = entities

      dispatch(updateRequestStatus({ requestStatus: enums.requestStatus.SuccessToLoading }))
      dispatch(fetchItems({ items }))

      return entities.items
    } catch (e) {
      console.log(e)
      dispatch(updateRequestStatus({ requestStatus: enums.requestStatus.FailToLoading }))
      throw e
    }
  },

  getItems: (variables = {}) => async dispatch => {
    try {
      dispatch(updateRequestStatus({ requestStatus: enums.requestStatus.Loading }))

      const { entities } = await dao.getItems(variables)
        .then(res => normalize(res.data.Me, USER_SCHEMA))
      const { items } = entities

      dispatch(updateRequestStatus({ requestStatus: enums.requestStatus.SuccessToLoading }))
      dispatch(fetchItems({ items }))

      return entities.items
    } catch (e) {
      console.log(e)
      dispatch(updateRequestStatus({ requestStatus: enums.requestStatus.FailToLoading }))
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

const getItemById = state => id => createSelector(
  items,
  (_, id) => id,
  (data, id) => data.find(f => f.id === id)
)(state, id)

const selectors = {
  items,
  getItemById
}

/** REDUCER */

const reducer = handleActions(
  {
    [fetchItems]: (state, { payload: { items, ids } }) => {
      if (!items) {
        return state
      }

      return {
        ...state,
        ids: _.union(state.ids, ids),
        items: { ...state.items, ...items }
      }
    },
    [fetchSelectedItem]: (state, { payload: { item } }) => {
      if (!item) {
        return { ...state, item: null }
      }

      return {
        ...state,
        item
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
