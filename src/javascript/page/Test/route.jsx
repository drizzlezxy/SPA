import React from 'react';
import Bundle from 'components/Bundle/Bundle';
const loadPage = () => import(/* webpackChunkName: "Test" */ './index.jsx');

// components load their module for initial visit
const PageComp = (props) => (
  <Bundle load={loadPage}>
    {(Page) => <Page {...props} />}
  </Bundle>
);

export default PageComp;
