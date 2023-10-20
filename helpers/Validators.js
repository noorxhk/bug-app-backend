class Validators {

  static isValidStr (str) {

    if (!str) {
      return false;
    }
    return (str && typeof (str) === 'string' && str.trim() && str !== '');
  }

  static isValidateEmail (email) {

    const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im;

    return re.test(String(email).toLowerCase());

  }

  static parseInteger (value, defaultValue) {

    try {

      value = parseInt(value, 10);

      return Number.isNaN(value) ? defaultValue : value;

    } catch (ex) {

      return defaultValue;

    }

  }

  static isValidPassword (password) {

    if (Validators.isValidStr(password) && password.length >= 8) {

      return true;

    }

    return false;

  }

  static isArray (variable) {

    return (variable && (Object.prototype.toString.call(variable) === '[object Array]') && Array.isArray(variable));

  }

  static isValidBugStatus(status) {
    
    const bugStatus = ['new', 'started', 'completed', 'resolved'];

    if(status && this.isValidStr(status) && bugStatus.includes(status)) {


      return true;

    } else {

      return false;
    }
  }

  static isValidBugType(type) {
    const bugType = ['feature', 'bug'];

    if(type && this.isValidStr(type) && bugType.includes(type)) {
      return true;

    } else {
      return false;
    }
  }

  static isValidUserType(type) {
    const userType = ['developer', 'manager', 'qa'];

    if(type && this.isValidStr(type) && userType.includes(type)) {
      return true;

    } else {
      return false;
    }
  }

  static validateCode (code, defaultCode) {

    if (code >= 400 && code < 500) {

      return code;

    }

    return defaultCode;
  
  }

}

module.exports = Validators;
