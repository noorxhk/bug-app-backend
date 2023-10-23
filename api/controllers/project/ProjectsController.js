const db = require('../../../db/db')
const ProjectHandler = require('../../handlers/ProjectHandler');
const ProjectManager = require('./ProjectManager');
const { Validators } = require("../../../helpers")
const ErrorCodes = require('../../../constants/ErrorCodes')


class ProjectsController {
  static async create_project(req, res) {
    try {
      const projects = await ProjectManager.create_project(req.body)
      res.json({
        success: true,
        projects: projects

      });
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
      
        return res.status(statusCode).json(response);
    }
  }
  
  static async update_project (req, res) {
    
    try {
      const projectId = req.params.id;
      let project = await  ProjectManager.update_project(projectId, req.body)
      res.json({
        success: true,
        project: project
      });
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
      
        return res.status(statusCode).json(response);
    }
  }
  
  static async delete_project (req, res) {

    try {
      const projectId = req.params.id;
      const project = await ProjectManager.delete_project(projectId)
      if (project > 0) {
        res.json({
          success: true,
          message: 'Project Deleted Succesfully'
        });
      } else {
        res.json({ 
          success: false,
          error: 'Project not found' });
      }
    } catch (error) {
      console.error('Error deleting Project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async  get_project(req, res) {
    try {
      const projectId = req.params.id;
      const project = await ProjectManager.get_project(projectId)
      if (project) {
        res.json({
          success: true,
          project: project
        });
      } else {
        res.json({ 
          success: false,
          error: 'Project not found' });
      }
    } catch (error) {
      const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
      
        return res.status(statusCode).json(response);
      
    }
  }
  
  static async project_bugs (req, res) {
    try {
      const projectId = req.params.id;
      const bugs = await ProjectManager.get_bugs(projectId)
      if (bugs.length > 0 ) {
        res.json({
          success: true,    
          bugs: bugs
        });
      } else {
        res.json({ 
          success: false,
          error: `No Bugs for Project ID::${projectId} found` });
      }
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
        return res.status(statusCode).json(response);
    }
  }
  
  static async project_users(req, res) {
    try {
      const projectId = req.params.id;
      const project_users = await ProjectManager.get_project_users(projectId)
      if (project_users.length > 0 ) {
        res.json({
          success: true,
          project_users: project_users
        });
      } else {
        res.json({ 
          success: false,
          error: `No user for Project ID::${projectId} found` });
      }
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
        return res.status(statusCode).json(response);
    }
  }

  static async resolved_bugs(req, res) {
    try {
      const projectId = req.params.id;
      const resolved_bugs = await ProjectManager.get_resolved_bugs(projectId)
      console.log("resolve",resolved_bugs)
      if (resolved_bugs.count > 0 ) {
        res.json({
          success: true,
          resolved_bugs: resolved_bugs
        });
      } else {
        res.json({ 
          success: false,
          error: `No bugs Project ID::${projectId} found` });
      }
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
        return res.status(statusCode).json(response);
    }
  }
  static async assign_project(req, res) {
    try {
      const projectId = req.params.id;
      const userId = req.body.user_id
      const project_user = await ProjectManager.assign_project_to_user(projectId, userId)
        res.json({
          success: true,
        });
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
        return res.status(statusCode).json(response);
    }
  }

  static async all_bugs(req, res) {
    try {
      const projectId = req.params.id;
      const all_bugs = await ProjectManager.get_all_bugs(projectId)
      console.log("resolve",all_bugs)
      if (all_bugs.count > 0 ) {
        res.json({
          success: true,
          all_bugs: all_bugs
        });
      } else {
        res.json({ 
          success: false,
          error: `No bugs Project ID::${projectId} found` });
      }
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
        return res.status(statusCode).json(response);
    }
  }
  
  static  async project_manager(req, res) {
    try {
      const projectId = req.params.id;
      const project_manager = await ProjectManager.get_project_manager(projectId)
      if (project_manager ) {
        res.json({
          success: true,
          project_manager: project_manager
        });
      } else {
        res.json({ 
          success: false,
          error: `No manager for Project ID::${projectId} found` });
      }
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
        return res.status(statusCode).json(response);
    }
  }
}

module.exports = ProjectsController;

