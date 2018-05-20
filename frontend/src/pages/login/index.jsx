// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login, logout } from '_actions/user';

import s from './style.styl';

class Login extends React.Component {
  componentWillMount() {
    console.log(this.props)
  }

  login() {
    this.props.login();
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { user } = this.props;

    return (
      <div className={s.wrapper}>
        Login
        <button onClick={() => this.login()}>login</button>
        <button onClick={() => this.logout()}>logout</button>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({ login, logout }, dispatch),
)(Login);
