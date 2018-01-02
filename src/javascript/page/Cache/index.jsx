import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import createSingleCache from '../../extend/Cache.js';

import { Button } from 'antd';

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  btnClick () {
    const cache = createSingleCache();
    console.log(`从缓存中获取数据`);
    console.log('list:', cache.get('list'));
    console.log('words:', cache.get('words'));
  }

  render () {
    return (
      <div className="m-tabs" style={{ padding: 30, background: '#e6f7ff' }}>
        <div style={{ display: 'flex' }}>
          <h1 style={{ fontSize: '1.6em', marginRight: 20 }}>这里是 Cache 页</h1>
          <Button type="primary" style={{ marginRight: 20 }}>
            <Link to="/Tabs">去 Tabs 页</Link>
          </Button>
          <Button type="primary" onClick={this.btnClick}>获取缓存数据</Button>
        </div>
      </div>
    );
  }
}

export default PageComponent;
