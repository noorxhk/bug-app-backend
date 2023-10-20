const db = require('../../db/db');

class ProjectHandler {
  static createProject(data) {
    const { project_name, manager_id } = data;

    return db('projects')
      .insert({ project_name, manager_id })
      .returning('project_id')
      .then(([projectId]) => {
        return db('user_projects').insert({ user_id: manager_id, project_id: projectId.project_id });
      })
      .then(() => {
        return db
        .select('projects.*')
        .from('user_projects')
        .innerJoin('projects', 'user_projects.project_id', 'projects.project_id')
        .where('user_projects.user_id', data.manager_id)
      });
  }

  static updateProject(id, data) {
    return db('projects')
      .where({ project_id: id })
      .update({project_name: data.project_name}).returning('*');
  }

  static deleteProject(projectId) {
    return db('projects')
      .where({ project_id: projectId })
      .del();
  }

  static getProject(projectId) {
    return db('projects')
      .where({ project_id: projectId })
      .first();
  }

  static getBugsForProject(projectId) {
    return db('bugs')
      .select('*')
      .where('project_id', projectId);
  }

  static getUsersForProject(projectId) {
    return db('users')
      .select('users.*')
      .innerJoin('user_projects', 'users.user_id', 'user_projects.user_id')
      .where('user_projects.project_id', projectId);
  }

  static getResolvedBugs(projectId) {
    return db('bugs')
    .count('bug_id as count')
    .where('project_id', projectId)
    .whereIn('bug_status', ['resolved', 'completed'])
    .first();
  }

  static getAllBugsCount(projectId) {
    return db('bugs')
      .count('bug_id as count')
      .where('project_id', projectId)
      .first();
  }

  static getProjectManager(projectId) {
    return db('users')
      .select('users.*')
      .innerJoin('projects', 'users.user_id', 'projects.manager_id')
      .where('projects.project_id', projectId)
      .first();
  }
}

module.exports = ProjectHandler;