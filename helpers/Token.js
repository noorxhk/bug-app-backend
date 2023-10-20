const jwt = require('jsonwebtoken');
const config =  require('../config.json')


class Token {

  static getLoginToken (user) {

    let loginToken = jwt.sign({
      user_id: user.user_id,
      email: user.email
    }, config.secretKey , {
      expiresIn: config.timeouts.login
    });

    return loginToken;

  }

  static getRefreshToken (user) {

    let refreshToken = jwt.sign({
      user_id: user.user_id,
      email: user.email
    }, config.secretKey, {
      expiresIn: config.timeouts.refreshToken
    });

    return refreshToken;

  }
  
  static verifyToken (token, secretKey) {

    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded || false;
    } catch (err) {
      console.log(`verifyToken:: Could not verify the token. token:: ${token} secretKey:: ${secretKey}`, err);
      return false;
    }
  }
}

module.exports = Token;
