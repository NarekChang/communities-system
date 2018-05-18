// @flow
import React from 'react';
import { render } from 'react-dom';
import 'reset.css';
import 'normalize.css';

import App from './containers/app';

import './style.styl';

render(<App />, document.getElementById('app'));
