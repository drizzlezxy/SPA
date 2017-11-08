import React from 'react';
import ReactDOM from 'react-dom';
import 'scss/base.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from 'page/Login/route';
import Manage from 'page/Manage';
import NoMatch from 'page/NoMatch';

const routes = [
  { path: '/Login', component: Login },
  { path: '/Manage', component: Manage },
];

const BasicRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />

      {routes.map((route, i) => (
        <Route key={i} path={route.path} render={props => (
          <route.component {...props} routes={route.routes} />
        )} />
      ))}

      <Route component={NoMatch} />
    </Switch>
  </Router>
);

function doRender () {
  ReactDOM.render(<BasicRouter />, document.getElementById('app'));
}

setTimeout(doRender, 16);
