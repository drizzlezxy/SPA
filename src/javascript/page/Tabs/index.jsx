import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import createSingleCache from '../../extend/Cache.js';
import fetchData from '../../extend/fetchData.js';

import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

class PageComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    this.resetData('list');
  }

  /**
   * resetData 先尝试从缓存中获取数据，若没有fetch数据
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  resetData = (type) => {
    const cache = createSingleCache();
    const dataInCache = cache.get(type);

    if (dataInCache) {
      // 若缓存中有，则从缓存中获取
      console.log(`从缓存中获取 ${type} 数据`);
      this.setState({ [type]: dataInCache });
    } else {
      // 否则，fetch数据，并写入缓存中
      console.log(`fetch ${type} 数据`);
      fetchData(type).then((data) => {
        cache.set(type, data);
        this && this.setState({ [type]: data });
      });
    }
  }

  /**
   * resetData 直接fetch数据
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  resetData = (type) => {
    fetchData(type).then((data) => {
      this.setState({ [type]: data });
    });
  }

  onTabChange = (tabIndex) => {
    const type = {
      '1': 'list',
      '2': 'words',
    }[tabIndex];

    if (!this.state[type]) {
      this.resetData(type);
    }
  }

  render () {
    const {
      list,
      words,
    } = this.state;

    return (
      <div className="m-tabs" style={{ padding: 30 }}>
        <div style={{ display: 'flex' }}>
          <h1 style={{ fontSize: '1.6em', marginRight: 20 }}>这里是 Tabs 页</h1>
          <Button type="primary"><Link to="/Cache">去 Cache 页</Link></Button>
        </div>

        <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
          <TabPane tab="Tab 1" key="1">{
            list
              ? list.map(({ label, value }) => <div key={value}>{ `${label}: ${value}` }</div>)
              : '加载中。。。'
          }</TabPane>
          <TabPane tab="Tab 2" key="2">{ words || '加载中。。。' }</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PageComponent;
