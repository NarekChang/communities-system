// @flow
import React from 'react';

import s from './style.styl';

export default class Signup extends React.Component {
  componentWillMount() {
    console.log('Signup')
  }

  render() {
    return (
      <div className={s.wrapper}>
        Signup
      </div>
    )
  }
}
