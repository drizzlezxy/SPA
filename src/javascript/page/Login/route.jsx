import React from 'react';
import Bundle from 'components/Bundle/Bundle';
import loadPage from 'bundle-loader?lazy&name=Login!./index'; //eslint-disable-line

// components load their module for initial visit
const PageComp = (props) => (
  <Bundle load={loadPage}>
    {(Page) => <Page {...props} />}
  </Bundle>
);

export default PageComp;
