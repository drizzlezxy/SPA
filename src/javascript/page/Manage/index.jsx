import React from 'react';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import './index.scss';

import List from 'page/Manage/List/route';

const routes = [
  { path: '/Manage/List', component: List },
];

const click = () => {
  const a = { b:1 };
  Object.keys(a).map(item => a[item].map(bItem => console.log(bItem)));
};

const PageComponent = (props) =>
  (<div>
    <div className="click" onClick={click}>click here</div>
    <Navigation>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} render={renderProps => (
          <route.component {...renderProps} />
        )} />
      ))}
    </Navigation>
  </div>);

// PageComponent.propTypes = {
//   history: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
// };

export default PageComponent;
