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

  onClick () {
    const a = { b:1 };
    Object.keys(a).map(item => a[item].map(bItem => console.log(bItem)));
  }

  render () {
    return (
      <div className="m-objects">
        <div className="click" onClick={this.onClick} style={{
          height: '200px',
          width: '200px',
        }}>click here</div>
      </div>
    );
  }
}

export default PageComponent;
