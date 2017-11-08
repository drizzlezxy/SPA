import React, { Component } from 'react';
import './index.scss';

class MyComponent extends Component {
  // constructor (props) {
  //   super(props);
  // }

  render () {
    return (
      <div className="m-nomatch">
        <div className="m-header" />
        <div className="m-body">
          <p>当前页面不存在，</p>
          <p>请尝试其他路径。。。</p>
        </div>
        <div className="m-footer" />
      </div>
    );
  }
}

export default MyComponent;
