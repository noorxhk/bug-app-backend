const { Exception, Validators } = require('../helpers');
const {
  ErrorCodes,
  ProjectConstants
} = require('../constants');

class ProjectUtil {
  static validateProjectData(data) {
    if(!data) {
      throw new Exception(ProjectConstants.MESSAGES.INVALID_PROJECT_NAME, ErrorCodes.INTERNAL_SERVER_ERROR, { reportError: true }).toJson();
    }
    if(!data.project_name && !Validators.isValidStr(data.project_name)) {
      throw new Exception(ProjectConstants.MESSAGES.INVALID_PROJECT_NAME, ErrorCodes.INTERNAL_SERVER_ERROR, { reportError: true }).toJson();
    }
  }

}

module.exports = ProjectUtil;