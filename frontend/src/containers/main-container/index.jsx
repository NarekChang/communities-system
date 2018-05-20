import React from 'react'
import { Route, Switch } from 'react-router'

import TopBar from '_components/topbar';

import SignUp from '_pages/signup';
import Login from '_pages/login';
import Redirect from '_pages/redirect';
import Communities from '_pages/communities';
import CommunityPage from '_pages/community';

import ms from '../../style.styl';

const routes = (
  <div>
    <TopBar />
    <div className={ms.row}>
      <div className={ms.wrapper}>
        <Switch>
          <Route exact path="/logout" component={Redirect} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/communities" component={Communities} />
          <Route exact path="/:id/communities" component={CommunityPage} />
          <Route path="/" component={Redirect} />
        </Switch>
      </div>
     </div>
  </div>
)

export default routes
