const UserUtil = require('../../../Utilities/UserUtil')
const UserHandler =  require('../../handlers/UserHandler')

class UserManager {
  static async user_projects(userId) {
    let user_pojects = await UserHandler.getUserProjects(userId)
    return user_pojects;
  }

  static async  updateUser (userId, data) {
    UserUtil.validateUserData(data);
    let user = await UserHandler.update_user(userId, data);
    user = user[0];
    return user;
  }

  static async  sign_out (data) {
    let user = await UserHandler.signOut(data.user_id);
    user = user[0];
    return user;
  }

  static async get_user(userId) {
    let user = await UserHandler.getUser(userId);
    return user;
  }

  static async getDevelopers() {
    let developers = await UserHandler.get_developers();
    return developers;
  }
}

module.exports = UserManager
