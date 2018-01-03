import React, { Component } from 'react';
import { Form } from 'antd';
import Validator from '../../extend/Validator.js';
import './index.scss';
const FormItem = Form.Item;

class PageComponent extends Component {
  constructor (props) {
    super(props);

    const itemList = [
      {
        id: 'username',
        label: '用户姓名',
        placeholder: '请输入用户姓名',
        rules: [
          { rule: 'notNull', errMsg: '必填' },
        ],
      }, {
        id: 'telephone',
        label: '联系电话',
        placeholder: '请输入11位手机号',
        rules: [
          { rule: 'isMobile', errMsg: '格式不正确' },
        ],
      }, {
        id: 'verifyCode',
        label: '验证码',
        placeholder: '请输入验证码',
        rules: [
          { rule: 'isVerifyCode', errMsg: '6位数字' },
        ],
      },
    ];
    const values = {};
    const infos = {};
    itemList.map(item => {
      values[item.id] = undefined;
      infos[item.id] = undefined;
    });

    this.state = {
      itemList,
      values,
      infos,
    };
  }

  updateMainInfoValue = (id, value) => {
    const newValues = { ...this.state.values };
    newValues[id] = value;
    console.log('updateMainInfoValue', newValues);

    this.setState({
      values: newValues,
      infos: this.validate(newValues),
    });
  }

  validate = (values) => {
    const { itemList } = this.state;

    const validator = new Validator();
    itemList.map(item => {
      const { id, rules } = item;
      validator.add({
        id,
        value: values[id],
        rules,
      });
    });
    return validator.doValidate();
  }

  validate = (values) => {
    const { username, telephone, verifyCode } = values;
    const infos = {};
    if (!username || !username.trim()) {
      infos.username = '必填';
    }
    if (!/^1[3|4|5|7|8|][0-9]{9}$/.test(telephone)) {
      infos.telephone = '格式不正确';
    }
    if (!/(^\d{6}$)/.test(verifyCode)) {
      infos.verifyCode = '6位数字';
    }
    return infos;
  }

  render () {
    const {
      itemList,
      values,
      infos,
    } = this.state;
    return (
      <div className="fill-info">{
        itemList.map(({ id, label, placeholder }) =>
          <FormItem label={label} key={id} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
            <input
              placeholder={placeholder}
              value={values[id] || ''}
              onChange={(e) => this.updateMainInfoValue(id, e.target.value)}
            />
            <p>{infos[id]}</p>
          </FormItem>
        )
      }</div>
    );
  }
}

export default PageComponent;
