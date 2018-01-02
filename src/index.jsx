import React from 'react';
import ReactDOM from 'react-dom';
import 'scss/base.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Login from 'page/Login';
// import Test from 'page/Test/route.jsx';
// import Manage from 'page/Manage';
// import NoMatch from 'page/NoMatch';

// const routes = [
//   { path: '/Login', component: Login },
//   { path: '/Test', component: Test },
//   { path: '/Manage', component: Manage },
// ];
import Tabs from 'page/Tabs';
import Cache from 'page/Cache';

const routes = [
  { path: '/Tabs', component: Tabs },
  { path: '/Cache', component: Cache },
];

const BasicRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Tabs} />

      {routes.map((route, i) => (
        <Route key={i} path={route.path} render={props => (
          <route.component {...props} routes={route.routes} />
        )} />
      ))}

      <Route component={Tabs} />
    </Switch>
  </Router>
);

function doRender () {
  ReactDOM.render(<BasicRouter />, document.getElementById('app'));
}

setTimeout(doRender, 16);
