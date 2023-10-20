const User = Object.freeze({

  MESSAGES: {
    INVALID_DATA_TO_REFRESH_TOKEN: 'Invalid data to refresh token',
    INVALID_USER_TYPE: 'Invalid type provided',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token provided',
    INVALID_PASSWORD: 'Invalid password provided',
    INVALID_EMAIL: 'Invalid email provided',
    PASSWORD_DOES_NOT_MATCH: 'Invalid email or password',
    LOGIN_FAILED: 'Something went wrong while login user. Please try again.',
    INVALID_AUTHENTICATION_TOKEN: 'Invalid or expired token',
    SIGN_UP_FAILED: 'Something went wrong while sign up. Please try again.',
    INVALID_DATA_TO_LOGIN: 'Invalid data to login',
    REFRESH_TOKEN_FAILED: 'Something went wrong while refreshing token. Please try again.',
    REFRESH_TOKEN_HAS_EXPIRED: 'Refresh token has expired',
    EMAIL_ALREADY_TAKEN: "Email already taken",
    USER_ALREADY_EXIST: 'User already exist',
    EMAIL_ALREADY_EXIST: 'Email already exist',
    INVALID_DATA_TO_SIGNUP_USER: 'Invalid data to sign up user',
    INVALID_DATA_TO_UPDATE_USER: 'Invalid data to update user profile',
    UPDATE_USER_FAILED: 'Update user Failed',
    USER_DOES_NOT_EXIST: 'User does not exist',
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
    TOKEN_IS_INVALID_OR_EXPIRED: 'Token is invalid or expired',
  }

});

module.exports = User;
