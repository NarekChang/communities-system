import React from 'react';

import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, compose, createStore } from 'redux';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers'

import 'reset.css';
import 'normalize.css';

import App from './containers/app';

import './style.styl';

const history = createBrowserHistory()
const logger = createLogger({
  ...history,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(logger),
  ),
)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render()

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    render();
  })

  module.hot.accept('./reducers', () => {
    store.replaceReducer(connectRouter(history)(rootReducer));
  })
}
