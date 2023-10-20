const { Exception, Validators } = require('../helpers');
const {
  ErrorCodes,
  BugConstants
} = require('../constants');
const BugHandler = require('../api/handlers/BugHandler');

class BugUtil {
  static async validateBugData(data) {
    const bug_uniq = await BugHandler.checkTitleUniqueness(data.bug_title)
    if (!data) {
      throw new Exception(UserConstants.MESSAGES.INVALID_DATA_TO_SIGNUP_USER, ErrorCodes.INTERNAL_SERVER_ERROR, { reportError: true }).toJson();
    }

    if (data.bug_title && !Validators.isValidStr(data.bug_title)) {
      throw new Exception(BugConstants.MESSAGES.INVALID_BUG_TITLE, ErrorCodes.INTERNAL_SERVER_ERROR, { reportError: true }).toJson();
    }

    if (bug_uniq) {
      throw new Exception(BugConstants.MESSAGES.TITLE_EXISTS, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (data.bug_status && !Validators.isValidBugStatus(data.bug_status)) {
      throw new Exception(BugConstants.MESSAGES.INVALID_BUG_STATUS, ErrorCodes.INTERNAL_SERVER_ERROR, { reportError: true }).toJson();
    }

    if (data.bug_type && !Validators.isValidBugType(data.bug_type)) {
      throw new Exception(BugConstants.MESSAGES.INVALID_BUG_TYPE, ErrorCodes.INTERNAL_SERVER_ERROR, { reportError: true }).toJson();
    }
    

  }

}

module.exports = BugUtil;