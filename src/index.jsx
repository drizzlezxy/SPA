import React from 'react';
import ReactDOM from 'react-dom';
import 'scss/base.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from 'page/Login/route';
import Manage from 'page/Manage';
import NoMatch from 'page/NoMatch';

import Raven from 'raven-js';
Raven.config(
  'https://81501ae3a08f49b0b70d337f98cd4e8a@sentry.io/241579',
  { release: 'V1.0.0' },
).install();

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
