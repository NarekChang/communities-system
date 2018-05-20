import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';

import MainContainer from '../main-container';

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      {MainContainer}
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
};

export default App;
