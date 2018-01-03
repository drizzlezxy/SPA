class Validator {
  static strategies = {
    notNull (value) {
      return typeof value !== 'undefined' && value.constructor === String && value.trim() !== '';
    },
    isMobile (value) {
      const reMobile = /^1[3|4|5|7|8|][0-9]{9}$/;
      return reMobile.test(value);
    },
    isID (value) {
      const reID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return reID.test(value);
    },
    isVerifyCode (value) {
      const reID = /(^\d{6}$)/;
      return reID.test(value);
    },
    isName (value) {
      const reID = /(^[\u4E00-\u9FA5A-Za-z0-9_]*$)/;
      return reID.test(value);
    },
    minLength (value, length) {
      return Validator.strategies.notNull(value) && value.length > length;
    },
  }

  constructor () {
    this.itemList = [];
    this.result = {};
  }

  add ({ id, value, rules }) {
    const valiFunc = (id, value, ruleItem) => {
      this.result[id] = '';

      if (!Validator.strategies[ruleItem.rule](value)) {
        this.result[id] = ruleItem.errMsg;
      }
    };

    rules.map(ruleItem => {
      this.itemList.push(
        () => valiFunc(id, value, ruleItem)
      );
    });
  }

  doValidate () {
    this.itemList.map(itemFunc => itemFunc());
    return this.result;
  }
}

export default Validator;
