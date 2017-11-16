import React from 'react';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import './index.scss';

import List from 'page/Manage/List/route';

const routes = [
  { path: '/Manage/List', component: List },
];

const PageComponent = (props) =>
  (<Navigation>
    {routes.map((route, i) => (
      <Route key={i} path={route.path} render={renderProps => (
        <route.component {...renderProps} />
      )} />
    ))}
  </Navigation>);

// PageComponent.propTypes = {
//   history: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
// };

export default PageComponent;
