import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import RequestUtil from 'extend/common/RequestUtil';
import './HeadNav.scss';
import CookieUtil from 'extend/common/CookieUtil';

class HeadNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current: '',
    };
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    this.props.changeBucket(e.key);
  }
  out = () => {
    return RequestUtil.fetch(
      'admin/out',
      {},
      {
        method: 'GET',
      }
    ).then((res) => {
      if (res.code === 0) {
        this.props.history.push({
          pathname: '/Login',
        });
      } else {
        message.error(JSON.stringify(res.msg));
      }
      // return json;
    });
  }

  render () {
    // const { buckets } = this.props;
    // const { current } = this.state;
    return (
      <div className="m-HeadNav">
        {/*
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current || (buckets.length ? buckets[0].name : '')]}
          mode="horizontal"
          style={{ height: 64, background: '#404040', color: 'rgba(255, 255, 255, 0.67)' }}
        >
          {
            buckets.map((item, index) =>
              <Menu.Item key={`${item.name}`}>
                <Link to={{
                  pathname: `${item.router}`,
                  state: {
                    curBucket: item,
                  },
                }}>{item.name}</Link>
              </Menu.Item>
            )
          }
        </Menu>
        */}
        <div className="m-HeadNav-buckets">
          <span>{CookieUtil.getCookieH5('dirName')}</span>
          <Button
            type="primary"
            onClick={this.out}
            style={{ margin: 20, float:'right' }}
          >
            退出
          </Button>
        </div>
      </div>
    );
  }
}

HeadNav.propTypes = {
  // buckets: PropTypes.array.isRequired,
  changeBucket: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const HeadNavWithRouter = withRouter(HeadNav);
export default HeadNavWithRouter;
