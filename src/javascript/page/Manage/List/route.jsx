import React from 'react';
import Bundle from 'components/Bundle/Bundle';
const loadPage = () => import(/* webpackChunkName: "List" */ './index.jsx');

// components load their module for initial visit
const List = (props) => (
  <Bundle load={loadPage}>
    {(Page) => <Page {...props} />}
  </Bundle>
);

export default List;
