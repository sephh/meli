import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers';
import getEnv from '../environments'

const env = getEnv();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = env.production ? applyMiddleware(thunk) : composeEnhancers(
  applyMiddleware(thunk),
);

export default createStore(
  combineReducers({
    ...reducers
  }),
  enhancer,
);
