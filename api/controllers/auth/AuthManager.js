const UserHandler = require('../../handlers/UserHandler');

const AuthUtil = require('../../../Utilities/AuthUtil')
const UserUtil = require('../../../Utilities/UserUtil')
const {
  ErrorCodes,
  UserConstants,
} = require('../../../constants');

const {
  Exception,
  Token,
  bcrypt,
  Validators
} = require('../../../helpers');


class AuthManager {

  static async  signup (data) {

    AuthUtil.validateSignUpRequest(data);
    
    let user = await UserHandler.findUserByEmail(data.email);
    AuthUtil.validateUserForSignUp(user);

    data.password = await AuthUtil.createHashedPassword(data.password);
    user = await UserHandler.createUser(data);

    user = user[0];
    user = await AuthManager.setAccessToken(user);
    return user;
  }

  static async login (data) {
    
    AuthUtil.validateLoginRequest(data);
    let user = await UserHandler.findUserByEmail(data.email);
    AuthUtil.validateUserToAuthenticate(user);
    const passwordMatched = await bcrypt.compare(data.password, user.password);
    if (!passwordMatched) {
      console.log(`login:: Password does not match. users:: ${JSON.stringify(user)} data:: `, data);
      throw new Exception(UserConstants.MESSAGES.PASSWORD_DOES_NOT_MATCH, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
    }

    user = await AuthManager.setAccessToken(user)
    return user;
  }

  static async refreshToken (user, data) {
    console.log(`refreshToken:: Request to refresh token. userId:: ${user.user_id} user:: ${user.email} data:: `, data);
    AuthUtil.validateRefreshTokenRequest(data);
    const decoded = Token.verifyToken(data.refresh_token, 'secret');
    AuthUtil.validateRefreshToken(user, decoded);
    user = await AuthManager.setAccessToken(user);
    console.log(`refreshToken:: Token successfully refreshed. userId:: ${user.user_id}, user:: ${user.email} data:: `, data);
    return user;
  }

  static async setAccessToken (user) {

    const accessToken = Token.getLoginToken(user);
    const refreshToken = Token.getRefreshToken(user);
    user = await UserHandler.setAccessToken(user.user_id, accessToken, refreshToken);
    return user;
  }

}

module.exports = AuthManager;