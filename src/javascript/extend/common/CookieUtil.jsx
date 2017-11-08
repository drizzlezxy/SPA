export default class CookieUtil {
// cookie relative
// utility function called by getCookie()
  static getCookieVal (offset) {
    var endstr = document.cookie.indexOf(';', offset);
    if (endstr === -1) {
      endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
  }

  // primary function to retrieve cookie by name
  static getCookie (name) {
    var arg = name + '=';
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
      var j = i + alen;
      if (document.cookie.substring(i, j) === arg) {
        return CookieUtil.getCookieVal(j);
      }
      i = document.cookie.indexOf(' ', i) + 1;
      if (i === 0) break;
    }
    return null;
  }

  static getExpireString (vEnd) {
    var sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
      }
    }
    return sExpires;
  }

  // store cookie value with optional details as needed
  static setCookie (name, value, expires, path, domain, secure) {
    document.cookie = name + '=' + escape(value) +
    ((expires) ? CookieUtil.getExpireString(expires) : '') +
    ((path) ? '; path=' + path : '') +
    ((domain) ? '; domain=' + domain : '') +
    ((secure) ? '; secure' : '');
  }

  // remove the cookie by setting ancient expiration date
  static deleteCookie (name, path, domain) {
    if (CookieUtil.getCookie(name)) {
      document.cookie = name + '=' +
      ((path) ? '; path=' + path : '') +
      ((domain) ? '; domain=' + domain : '') +
      '; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    }
  }
  /**
   * [setCookie_h5 支持H5的设置cookie]
   * @param {[type]} e [cookie name]
   * @param {[type]} t [cookie value]
   */
  static setCookieH5 (e, t) {
    if (window.localStorage) localStorage.setItem(e, t);
    else {
      let a = 30;
      let r = new Date();
      r.setTime(r.getTime() + 24 * a * 60 * 60 * 1e3);
      document.cookie = e + '=' + escape(t) + ';expires=' + r.toGMTString();
    }
  }
  /**
   * [getCookie_h5 支持H5的获取cookie]
   * @param  {[type]} e [cookie name]
   * @return {[type]}   [description]
   */
  static getCookieH5 (e) {
    if (window.localStorage) return localStorage.getItem(e);
    let t = Object;
    let a = new RegExp('(^| )' + e + '=([^;]*)(;|$)');
    return (t = document.cookie.match(a)) ? t[2] : null;
  }
}
