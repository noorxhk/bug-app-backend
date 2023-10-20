const db = require('../../../db/db');
const UserHandler = require('../../handlers/UserHandler');
const { Validators } = require("../../../helpers")
const ErrorCodes = require('../../../constants/ErrorCodes')
const UserManager = require('../../controllers/user/UserManager')

class UsersController {
  static async  user_projects(req, res)  {
    try {
      const userId = req.params.id; 
      const userProjects = await UserManager.user_projects(userId)
      if (userProjects.length > 0 ) {
        res.json({
          success: true,
          userProjects: userProjects
        });
      } else {
        res.json({ 
          success: false,
          userProjects: [],
          error: `No Project for User ID::${userId} found` });
      }
    } catch (error) {
        const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
        const response = {
          success: false,
          message: error.message
        };
        return res.status(statusCode).json(response);
    }
  };
  
  static async get_developers (req, res) {
    try {
      const developers = await UserManager.getDevelopers();
      if (developers.length > 0 ) {
        res.json({
          success: true,
          developers: developers
        });
      } else {
        res.json({ 
          success: false,
          error: `No Developers found` });
        }
      } catch (error) {
          const statusCode = Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR;
          const response = {
            success: true,
            message: error.message
          };
          return res.status(statusCode).json(response);
      }
  }

  static async sign_out(req, res) {
    try {
      const user = await UserManager.sign_out(req.body)
      res.json({
        success: true,
        message: "sign out successfully"
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
  static async update_user(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserManager.updateUser(userId, req.body)
      res.json({
        success: true,
        user: user
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

  static async  get_user(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserManager.get_user(userId)
      if (user) {
        res.json({
          success: true,
          user: user
        });
      } else {
        res.json({ 
          success: false,
          error: 'User not found' });
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

module.exports = UsersController

