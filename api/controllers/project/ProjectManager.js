const ProjectUtil = require('../../../Utilities/ProjectUtil');
const ProjectHandler = require('../../handlers/ProjectHandler');

class ProjectManager {
  static async create_project(data) {
    ProjectUtil.validateProjectData(data);
    let project = await ProjectHandler.createProject(data);
    return project;
  }
  static async update_project(projectId, data) {
    ProjectUtil.validateProjectData(data);

    let project = await ProjectHandler.updateProject(projectId, data);
    return project[0];
  }
  static async  delete_project (projectId) {
    let project = await ProjectHandler.deleteProject(projectId);
    return project;
  }
  static async  get_project (projectId) {
    let project = await ProjectHandler.getProject(projectId);
    return project;
  }

  static async get_bugs(projectId) {
    let bugs = await ProjectHandler.getBugsForProject(projectId)
    return bugs;
  }
  static async get_project_users(projectId) {
    let project_users = await ProjectHandler.getUsersForProject(projectId)
    return project_users;
  }

  static async get_project_manager(projectId) {
    let project_manager = await ProjectHandler.getProjectManager(projectId)
    return project_manager;
  }


}

module.exports = ProjectManager;