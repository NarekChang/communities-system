// @flow
import React from 'react';

import s from './style.styl';

export default class CommunityPage extends React.Component {
  componentWillMount() {
    console.log('CommunityPage')
  }

  render() {
    return (
      <div className={s.wrapper}>
        CommunityPage
      </div>
    )
  }
}
