import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form, Icon, Input, Button, message } from 'antd';
import './index.scss';
import RequestUtil from 'extend/common/RequestUtil';
import CookieUtil from 'extend/common/CookieUtil';
import { encode } from 'extend/common/pwdUtil';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      formConfig: [
        {
          id: 'userName',
          options: {
            rules: [{ required: true, message: 'Please input your username!' }],
          },
          elem: <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />,
        }, {
          id: 'password',
          options: {
            rules: [{ required: true, message: 'Please input your Password!' }],
          },
          elem: <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />,
        },
      ],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        return RequestUtil.fetch(
          'admin/login',
          {
            username: values.userName,
            password: encode(values.password),
            // password: values.password,
          }
        ).then((res) => {
          // this.resetFiles(this.state.curPath);
          if (res.code === 0) {
            this.props.history.push({
              pathname: '/Manage/List',
            });
          } else {
            message.error(res.msg);
          }
          // return json;
        });
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="m-login">
        <div className="form-container">
          <p className="oss-controller">在线产品原型系统</p>
          <div className="oss-url">免登陆查看全部产品原型：</div>
          <a href="http://172.16.2.73:8080">全部产品原型</a>
          <Form onSubmit={this.handleSubmit} className="login-form">
            {
              this.state.formConfig.map((item, key) =>
                <FormItem key={`form-${key}`}>
                  {getFieldDecorator(item.id, item.options)(item.elem)}
                  {
                    item.renderExtra && item.renderExtra.belowList &&
                    item.renderExtra.belowList.map(
                      (bItem, bKey) => bItem({ key: `form-${key}-${bKey}` })
                    )
                  }
                </FormItem>
              )
            }
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <a href="http://172.16.1.194:8360/post/prototype.html" target="_blank">使用帮助</a>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

NormalLoginForm.propTypes = {
  history: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default PageComponent;
