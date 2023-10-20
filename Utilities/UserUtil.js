const {
  ErrorCodes,
  UserConstants
} = require('../constants');

const {
  Exception,
  Validators
} = require('../helpers');

class UserUtil {

  static transformUsersData (users) {

    if (!Array.isArray(users) || !users.length) {

      return users;

    }

    return users.map(user => UserUtil.transformUserData(user));

  }

  static transformUserData (user) {

    if (!user) {

      return user;

    }

    delete user.refresh_token;
    delete user.password;

    return user;

  }

  static updateUserData (user) {

    if (!user) {
      return user;
    }

    delete user.password;

    return user;

  }

  static validateUserData (data) {

    if (!data) {
      throw new Exception(UserConstants.MESSAGES.INVALID_DATA_TO_SIGNUP_USER, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (data.email && !Validators.isValidateEmail(data.email)) {
      throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (data.user_type && !Validators.isValidUserType(data.user_type)) {
      throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if ((data.password !== null && data.password !== undefined) && (data.password === "" || !Validators.isValidStr(data.password))) {
      throw new Exception(UserConstants.MESSAGES.INVALID_PASSWORD, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }
  }

  static createReturnData (user) {

    const data = {};

    data.user = user;

    return data;

  }

}

module.exports = UserUtil;
