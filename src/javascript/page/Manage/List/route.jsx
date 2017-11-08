import React from 'react';
import Bundle from 'components/Bundle/Bundle';
import loadPage from 'bundle-loader?lazy&name=List!./index'; //eslint-disable-line

// components load their module for initial visit
const List = (props) => (
  <Bundle load={loadPage}>
    {(Page) => <Page {...props} />}
  </Bundle>
);

export default List;
