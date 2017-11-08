// const common = require('./../utils/common');
// let CryptoJS = require("crypto-js");
import CryptoJS from 'crypto-js';
const baseKey = '59dc25d223e13f65284d602c';
/**
 * 加密函数
 * @param text  需要加密的内容
 * @param key   秘钥
 * @returns {Query|*}  密文
 */
export function encode (text, key) {
  var secret = key || baseKey;
  var cipher = CryptoJS.AES.encrypt(text, secret);
  return cipher.toString();
}
