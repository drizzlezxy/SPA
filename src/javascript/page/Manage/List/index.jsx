import React, { Component } from 'react';
import Modal from 'components/Modal';
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

  handleClick = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  render () {
    return [
      <a key="1" onClick={this.handleClick}>click here to add a new element.</a>,
      <div key="2">123456</div>,
      <div key="3">123456</div>,
      <div key="4">123456</div>,
      <div key="5">123456</div>,
      this.state.show
        ? <Modal key="6">
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
            <h1 style={{ color: 'red' }}>I'm the "new element"</h1>
          </div>
        </Modal>
        : null,
    ];
  }
}

export default PageComponent;
