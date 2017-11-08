/**
 * This class is used for controlling http requests based on current ENV variable
 */
import Util from 'extend/common/Util';
import fetch from 'isomorphic-fetch';
import UrlUtil, { getBaseUrl } from './UrlUtil';
import CookieUtil from 'extend/common/CookieUtil';
import { message } from 'antd';

export default class RequestUtil {
  static needMock () {
    return false;
  }

  static getEnvPrefix () {
    return getBaseUrl();
  }

  static fetch (url, data, opts = {}) {
    const defaultOpts = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'token': CookieUtil.getCookieH5('token'),
      },
    };

    opts = {
      ...defaultOpts,
      ...opts,
    };

    if (opts.method === 'POST') {
      if (opts.headers['Content-Type'] === 'application/json') {
        opts.body = JSON.stringify(data);
      } else {
        opts.body = data;
      }
    } else if (opts.method === 'GET') {
      url = UrlUtil.appendParams4Url(url, data);
    }

    return fetch(
      url.indexOf('//') > -1 ? url : (getBaseUrl() + url),
      opts,
    ).then(res => {
      if (res.status < 200 || res.status >= 300) {
        message.error('访问异常，请稍后重试...');
        return {
          resultCode: '-1',
          resultDesc: `${res.status} ${res.statusText}`,
        };
      }
      return res.json();
      // const contentType = res.headers.get('content-type');
      // if (contentType.indexOf('application/json') > -1) {
      //   return res.json();
      // } else {
      //   return res.blob();
      // }
    }).then(json => {
      if (json.code === 0) {
        return new Promise((resolve, reject) => {
          resolve(json);
        });
      } else if (json.code === 3) {
        location.replace('../Login');
      } else {
        message.error(json.msg);
      }
    }).catch(e => {
      message.error('网络异常，请稍后重试...');
      return {
        resultCode: '-1',
        resultDesc: '网络异常，请重试',
      };
    });
  };

  /**
   * [fetch ajax 超时请求处理]
   * @param  {String}  method     [description]
   * @param  {[type]}  url        [description]
   * @param  {Object}  data       [description]
   * @param  {[type]}  successFn      [description]
   * @param  {[type]}  errorFn        [description]
   * @param  {Boolean} isAbsolute     [description]
   * @param  {String}  absUrl          [description]
   */
  // static fetch (fetchObj) {
  //   let {
  //     method = 'get',
  //       url,
  //       data = {},
  //       successFn,
  //       errorFn,
  //       isAbsolute = false,
  //       absUrl = '',
  //   } = fetchObj;
  //   if (RequestUtil.needMock()) {
  //     // hook here
  //     // return mock data if it's in a dev env

  //     let promise = new Promise((resolve, reject) => {
  //       let mockData = RequestUtil.fetchMockData(url);
  //       console.log('mockData', mockData);
  //       if (successFn) {
  //         resolve(successFn(mockData));
  //       } else {
  //         reject(errorFn(mockData));
  //       }
  //     });
  //     return promise;
  //   }

  //   url = isAbsolute ? absUrl : (RequestUtil.getEnvPrefix() + url);

  //   if (method.toLowerCase() === 'get') {
  //     if (Util.isExisty(data)) {
  //       url = url + '?' + $.param(data);
  //     }
  //     data = null;
  //   } else {
  //     data = JSON.stringify(data);
  //   }

  //   return $.ajax({
  //     method: method,
  //     url: url,
  //     data: Util.isExisty(data) ? data : {},
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     dataType: 'json',
  //     traditional: true,
  //     xhrFields: {
  //       withCredentials: false,
  //     },
  //     crossDomain: true,
  //     success: function (result) {
  //       successFn && successFn(result);
  //     },
  //     error: function (...args) {
  //       errorFn && errorFn.apply(null, args);
  //     },
  //   });
  // }

  static fetchMockData (url) {
    // return RequestUtil.mockCache[url];
  }

  /*
   * [isResultSuccessful 判断Ajax返回信息是否成功]
   * @param   {Object}  result          [description]
   * @return  {Boolean}                    [description]
   */
  static isResultSuccessful (result) {
    return Util.isExisty(result) && Util.isExisty(result.resultCode) && result.resultCode === '0';
  }
}
