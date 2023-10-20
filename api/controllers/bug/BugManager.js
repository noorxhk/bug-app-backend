const BugUtil = require('../../../Utilities/BugUtil');
const BugHandler = require('../../handlers/BugHandler');

class BugManager {
  static async  create_bug (data, file) {
    
    await BugUtil.validateBugData(data);

    let bug = await BugHandler.createBug(data, file);
    return bug;
  }

  static async  updateBug (bugId, data, file) {
    BugUtil.validateBugData(data);
    let bugs = await BugHandler.updateBug(bugId, data, file);
    return bugs;
  }

  static async  getBug (bugId) {
    let bug = await BugHandler.getBug(bugId);
    return bug;
  }

  static async  deleteBug (bugId, data) {
    let bug = await BugHandler.deleteBug(bugId, data);
    return bug;
  }

  static async getBugCreator (bugId) {
    let bug_creator = await BugHandler.getBugCreator(bugId)
    return bug_creator
  }
  
  static async getBugDeveloper (bugId) {
    let bug_developer= await BugHandler.getBugDeveloper(bugId)
    return bug_developer
  }

}

module.exports = BugManager