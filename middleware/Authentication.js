const UserHandler = require("../api/handlers/UserHandler")
const { Validators, Exception, jwt} = require('../helpers');
const config = require('../config.json') 
const { ErrorCodes, UserConstants } = require('../constants');


class Authentication {
  static async authenticate(req, res, next) {
    try {
      let token = Validators.isValidStr(req.headers.authorization) ? req.headers.authorization.split(' ') : null;

      if (token.length < 1) {
        console.log(`authenticate:: Token is invalid. token:: `, token);
        throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, { reportError: true }).toJson();
      }

      token = token[1];
      const decoded = jwt.verify(token, config.secretKey);
      
      if (!decoded || !decoded.user_id || !decoded.email) {
        console.log("not in");
        console.log(`authenticate:: Token is invalid or expired. token:: ${token} decoded_data:: `, decoded);
        throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, { reportError: true }).toJson();
      }
      
      const user = await UserHandler.getAuthenticateUser(decoded.user_id, decoded.email, token);
      
      if (!user) {
        console.log(`authenticate:: Token is invalid, no user found. token:: ${token} decoded_data:: `, decoded);
        throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, { reportError: true }).toJson();
      }

      req.user = user;

      next();
    } catch (error) {
      console.log("Error in authentication:", error);

      return res.status(ErrorCodes.UNAUTHORIZED).json({
        success: false,
        message: UserConstants.MESSAGES.INVALID_AUTHENTICATION_TOKEN
      });
    }
  }
}
module.exports = Authentication