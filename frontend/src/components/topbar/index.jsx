// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

import ms from '../../style.styl';
import s from './style.styl';

export default class TopBar extends React.PureComponent {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={ms.row}>
          <div className={s.logo}>Communities system</div>
          <NavLink to="/logout" className={`${ms.resetbtn} ${s.logout}`}>Выйти</NavLink>
        </div>
      </div>
    )
  }
}
