import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import createSingleCache from '../../extend/Cache.js';

import { Button } from 'antd';

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (
      <div className="m-tabs" style={{ padding: 30 }}>
        <div style={{ display: 'flex' }}>
          <h1 style={{ fontSize: '1.6em', marginRight: 20 }}>这里是 Cache 页</h1>
          <Button type="primary"><Link to="/Tabs">去 Tabs 页</Link></Button>
        </div>
      </div>
    );
  }
}

export default PageComponent;
