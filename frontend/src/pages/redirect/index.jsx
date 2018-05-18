// @flow
import React from 'react';

import s from './style.styl';

export default class Redirect extends React.Component {
  componentWillMount() {
    console.log('Redirect')
  }

  render() {
    return (
      <div className={s.wrapper}>
        Redirect
      </div>
    )
  }
}
