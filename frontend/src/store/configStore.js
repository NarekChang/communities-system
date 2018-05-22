import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  blacklist: ['_persist'],
  storage: storage
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const history = createBrowserHistory()
const logger = createLogger({
  ...history,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  connectRouter(history)(pReducer),
  composeEnhancer(
    applyMiddleware(logger),
  ),
)

export const persistor = persistStore(store);
