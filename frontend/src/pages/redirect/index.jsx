// @flow
import React from 'react';
import _ from 'lodash';

export default class Redirect extends React.Component {
  componentWillMount() {
    const p = _.get(this, 'props.history.location.pathname').replace(/[0-9/]/gm, '');
    console.log(this.props)

    switch (p) {
      case 'login':
      case 'communities':
      case 'signup':
        break;
      case 'logout':
        this.props.history.push('/login');
        break;
      default:
        this.props.history.push('/communities');
        break;
    }
  }

  render() {
    return (<div />);
  }
  
};