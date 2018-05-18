// @flow
import React from 'react';

import s from './style.styl';

export default class Login extends React.Component {
  componentWillMount() {
    console.log('Login')
  }

  render() {
    return (
      <div className={s.wrapper}>
        Login
      </div>
    )
  }
}
