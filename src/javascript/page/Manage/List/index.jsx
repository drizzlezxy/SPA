import React, { Component } from 'react';
// import './index.scss';

class PageComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      addVisible: false,
      userList: [],
      pagination: {
        'current': 1,
        'total': 20,
        'pageSize': 10,
      },
      loading: false,
      title:'添加用户',
      editData: {},
    };
  }

  render () {
    return (
      <div className="m-objects">
        {''.split([])}
      </div>
    );
  }
}

export default PageComponent;
