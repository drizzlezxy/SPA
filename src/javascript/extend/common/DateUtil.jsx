import moment from 'moment';
import { message } from 'antd';

export default class DateUtil {
  static formatDate (value, format) {
    let maps = {
      'yyyy' : function (d) { return d.getFullYear(); },
      'MM' : function (d) { return fix(d.getMonth() + 1); },
      'dd' : function (d) { return fix(d.getDate()); },
      'HH' : function (d) { return fix(d.getHours()); },
      'mm' : function (d) { return fix(d.getMinutes()); },
      'ss' : function (d) { return fix(d.getSeconds()); },
    };

    let chunk = new RegExp(Object.keys(maps).join('|'), 'g');

    function fix (d) {
      d = '' + d;
      if (d.length <= 1) {
        d = '0' + d;
      }
      return d;
    }

    function formatDateInside (value, format) {
      format = format || 'yyyy-MM-dd HH:mm:ss';
      value = new Date(value);
      return format.replace(chunk, function (capture) {
        return maps[capture] ? maps[capture](value) : '';
      });
    }

    return formatDateInside(value, format);
  }

  /**
   * [calcCountDownByLeftTime 通过剩余秒数返回格式化的时间]
   * @param  {[type]} leftTimeMills [description]
   * @return {[type]}               [description]
   */
  static calcCountDownByLeftTime (leftTime) {
    let secondsPerMinute = 60;
    let secondsPerHour = 60 * secondsPerMinute;

    let leftHours = Math.floor(leftTime / secondsPerHour);
    let leftMinutes = Math.floor((leftTime - leftHours * secondsPerHour) / secondsPerMinute);
    let leftSeconds = Math.floor(leftTime % 60);

    if (leftTime < 0) {
      leftHours = 0;
      leftMinutes = 0;
      leftSeconds = 0;
    }

    return {
      hours: leftHours,
      minutes: leftMinutes,
      seconds: leftSeconds,
    };
  }

  /**
   * [timestramptoDate 时间戳转化为日期格式,返回格式：YYYY-MM-DD HH:mm:s]
   * @param  {[type]} timestamp [description]
   * @return {[type]}           [description]
   */
  static timestramptoDate (timestamp) {
    var tt = new Date(parseInt(timestamp));
    var month = '';
    var day = '';
    var hours = '';
    var minutes = '';
    var seconds = '';
    if ((tt.getMonth() + 1) < 10) {
      month = '0' + (tt.getMonth() + 1);
    } else {
      month = tt.getMonth() + 1;
    }

    if (tt.getDate() < 10) {
      day = '0' + tt.getDate();
    } else {
      day = tt.getDate();
    }
    if (tt.getHours() < 10) { hours = '0' + tt.getHours(); } else { hours = tt.getHours(); }
    if (tt.getMinutes() < 10) { minutes = '0' + tt.getMinutes(); } else { minutes = tt.getMinutes(); }
    if (tt.getSeconds() < 10) { seconds = '0' + tt.getSeconds(); } else { seconds = tt.getSeconds(); }
    return {
      'YEAR':tt.getFullYear(),
      'MONTH':month,
      'DAY':day,
      'HOURS':hours,
      'MINUTES':minutes,
      'SECONDS':seconds,
    };
  }

  static getLastMonthDays () {
    let nowdays = new Date();
    let year = nowdays.getFullYear();
    let month = nowdays.getMonth();
    if (month === 0) {
      month = 12;
      year = year - 1;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let lastMonFirst = year + '-' + month + '-' + '01';
    let myDate = new Date(year, month, 0);
    let lastMonLast = year + '-' + month + '-' + myDate.getDate();
    return { lastMonFirst, lastMonLast };
  }

  static defalutYesterday () {
    let today = new Date();
    let yesterday = today.setDate(today.getDate() - 1);
    let yesterdayToTrans = DateUtil.timestramptoDate(yesterday);
    let { YEAR, MONTH, DAY } = yesterdayToTrans;
    let yesterdayTransed = YEAR + '-' + MONTH + '-' + DAY;
    return yesterdayTransed;
  }

  static getCurrentMonthFirst () {
    let date = new Date();
    date.setDate(1);
    date = moment(date).format('YYYY-MM-DD');
    return date;
  }

  static disabledStartApartUntis (beginDate, endDate, number, unit) {
    let minDate = moment(endDate).subtract(number, unit);
    if (!beginDate || !endDate) {
      return false;
    }
    return beginDate.valueOf() < minDate.valueOf() || beginDate.valueOf() > endDate.valueOf();
  }

  static disabledEndApartUntis (beginDate, endDate, number, unit) {
    let maxDate = moment(beginDate).add(number, unit);

    if (!endDate || !beginDate) {
      return false;
    }
    return endDate.valueOf() > maxDate.valueOf() || endDate.valueOf() < beginDate.valueOf();
  }

  static dateConfirm (beginDate, endDate, alternativeObj) {
    if (!beginDate && !endDate) {
      beginDate = alternativeObj.beginDate;
      endDate = alternativeObj.endDate;
    } else if ((beginDate && !endDate) || (!beginDate && endDate)) {
      message.error('请重新选择时间');
      return null;
    } else {
      beginDate = moment(beginDate).format('YYYY-MM-DD');
      endDate = moment(endDate).format('YYYY-MM-DD');
    }
    return { beginDate, endDate };
  }
}
