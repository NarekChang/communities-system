// @flow
import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import TopBar from '_components/topbar';

import SignUp from '_pages/signup';
import Login from '_pages/login';
import Redirect from '_pages/redirect';
import Communities from '_pages/communities';
import CommunityPage from '_pages/community';

import ms from '../../style.styl';

const MainContainer = () => {
  return (
    <BrowserRouter>
      <div>
        <TopBar />
        <div className={ms.row}>
          <div className={ms.wrapper}>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Redirect} />
            <Route exact path="/communities" component={Communities} />
            <Route exact path="/:id/communities" component={CommunityPage} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
};

export default MainContainer;