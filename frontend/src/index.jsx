import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { store, history } from './store/configStore';

import 'reset.css';
import 'normalize.css';

import App from './containers/app';

import './style.styl';

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

render();