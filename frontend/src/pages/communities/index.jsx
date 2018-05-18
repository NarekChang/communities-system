// @flow
import React from 'react';

import s from './style.styl';

export default class Communities extends React.Component {
  componentWillMount() {
    console.log('Communities')
  }

  render() {
    return (
      <div className={s.wrapper}>
        Communities
      </div>
    )
  }
}
