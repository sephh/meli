import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

export default () => {
  return createStore(combineReducers({
      ...reducers
    })
    , applyMiddleware(thunk))
};
