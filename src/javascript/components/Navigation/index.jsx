import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
// import RequestUtil from 'extend/common/RequestUtil';
import { Layout, Menu, Icon } from 'antd';
import HeadNav from './HeadNav';
import { menuCfg } from './menuCfg';
import './index.scss';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Navigation extends Component {
  constructor (props) {
    super(props);
    this.state = {
      buckets: [
        {
          name: '文件上传',
          region: 'oss-cn-shanghai',
          creationDate: '2017-07-05T03:17:38.000Z',
          router: '/Manage/Objects',
        },
        {
          name: '用户管理',
          region: 'oss-cn-shanghai',
          creationDate: '2017-07-05T03:17:38.000Z',
          router: '/Manage/User',
        },
      ],
      curBucket: {
        name: '文件上传',
        region: 'oss-cn-shanghai',
        creationDate: '2017-07-05T03:17:38.000Z',
      },
      selectedKeys: menuCfg.initMenu().initKey,
      menuList: menuCfg.initMenu(),
    };
  }

  handleClick = (e) => {
    this.setState({
      selectedKeys: e.key,
    });
  }

  componentDidMount () {
    let rootAdmin = true;
    if (rootAdmin) {
      this.setState({
        buckets: [
          {
            name: '文件上传',
            region: 'oss-cn-shanghai',
            creationDate: '2017-07-05T03:17:38.000Z',
            router: '/Manage/Objects',
          },
          {
            name: '用户管理',
            region: 'oss-cn-shanghai',
            creationDate: '2017-07-05T03:17:38.000Z',
            router: '/Manage/User',
          },
        ],
      });
    } else {
      this.setState({
        buckets: [
          {
            name: '文件上传',
            region: 'oss-cn-shanghai',
            creationDate: '2017-07-05T03:17:38.000Z',
            router: '/Manage/Objects',
          },
        ],
      });
    }
    // RequestUtil.fetch('bucket/list').then(json => {
    //   if (json.resultCode === '0') {
    //     this.setState({
    //       buckets: json.resultData.buckets,
    //       curBucket: json.resultData.buckets[0],
    //     });
    //     this.props.history.replace({
    //       pathname: this.props.location.pathname,
    //       state: { curBucket: json.resultData.buckets[0] },
    //     });
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
  }

  changeBucket = (bucketName) => {
    this.setState({
      curBucket: this.state.buckets.filter(item => item.name === bucketName)[0],
      selectedKeys: this.state.menuList.initKey,
    });
  }

  renderMenu = (data) => {
    return data.map((item, index) => {
      if (item.children) {
        return (
          <SubMenu key={item.id}
            title={<span>{item.icon && <Icon type={item.icon} />}{item.name}</span>}
          >
            {this.renderMenu(item.children)}
          </SubMenu>);
      } else {
        return (<Menu.Item key={item.id}>
          <Link to={{
            pathname: item.href,
            state: { curBucket: this.state.curBucket },
          }}>{item.icon && <Icon type={item.icon} />}{item.name}</Link>
        </Menu.Item>);
      }
    });
  }

  render () {
    const { children } = this.props;
    const { buckets, selectedKeys } = this.state;
    return (
      <Layout style={{ height: '100%' }}>
        <Header className="m-nav-header" style={{ padding: 0 }}>
          <div className="logo">在线产品原型系统</div>
          <HeadNav buckets={buckets} changeBucket={this.changeBucket} />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              onClick={this.handleClick}
              mode="inline"
              defaultSelectedKeys={[this.state.menuList.initKey]}
              selectedKeys={[selectedKeys]}
              defaultOpenKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {this.renderMenu(this.state.menuList.list)}
            </Menu>
          </Sider>
          <Layout style={{ padding: 24 }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minWidth: 780 }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

Navigation.propTypes = {
  // location: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

const NavigationWithRouter = withRouter(Navigation);
export default NavigationWithRouter;
