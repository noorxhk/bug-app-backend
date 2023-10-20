const db = require('../../../db/db')
const BugHandler = require('../../handlers/BugHandler')
const BugUtil = require('../../../Utilities/BugUtil')
const { Validators } = require('../../../helpers')
const ErrorCodes = require('../../../constants/ErrorCodes')
const { BugConstants } = require('../../../constants')
const BugManager = require('./BugManager')


class BugsController {
  static async create_bug(req, res) {
    try {
      const bug = await BugManager.create_bug(req.body, req.file)
      res.json({
        success: true,
        bug: bug

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
  
  static async  delete_bug (req, res) {
    try {
      const bugId = req.params.id;
      const bug = await BugManager.deleteBug(bugId, req.body)
      if (bug.length > 0) {
        res.json({
          success: true,
          bugs: bug
        });
      } else {
        res.status(201).json({ success: false,
        bugs: [],
        error: 'Bug not found' });
      }
    } catch (error) {
      console.error('Error deleting bug:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async update_bug(req, res) {
    try {
      const bugId = req.params.id;
      const bugs = await BugManager.updateBug(bugId, req.body, req.file)
      res.json({
        success: true,
        bugs: bugs
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
  
  static async  get_bug(req, res) {
    try {
      const bugId = req.params.id;
      const bug = await BugManager.getBug(bugId)
      if (bug) {
        res.json({
          success: true,
          bug: bug
        });
      } else {
        res.json({ 
          success: false,
          error: 'Bug not found' });
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
  
  static async  bug_creator (req, res) {
    try {
      const bugId = req.params.id;
      const creator = await BugManager.getBugCreator(bugId)
      if (creator) {
        res.json({
          success: true,
          bug_creator: creator
        });
      } else {
        res.json({ 
          success: false,
          error: 'Creator not found' });
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
  
  static async  bug_developer (req, res) {
    try {
      const bugId = req.params.id;
      const developer = await BugManager.getBugDeveloper(bugId)
      if (developer) {
        res.json({
          success: true,
          bug_developer: developer
        });
      } else {
        res.json({ 
          success: false,
          error: 'Developer not found' });
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


module.exports = BugsController
