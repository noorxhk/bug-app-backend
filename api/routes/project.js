const express = require('express');
const router = express.Router();
const  Authentication  = require("../../middleware/Authentication");



const projectsController = require('../controllers/project/ProjectsController')

router.post('/', projectsController.create_project);

router.get('/:id/bugs', Authentication.authenticate,  projectsController.project_bugs);

router.get('/:id/resolved-bugs',  projectsController.resolved_bugs);

router.get('/:id/all-bugs',  projectsController.all_bugs);

router.put('/:id', projectsController.update_project);

router.delete('/:id', projectsController.delete_project);

router.get('/:id', projectsController.get_project);

router.get('/:id/users', projectsController.project_users);

router.get('/:id/manager', projectsController.project_manager );



module.exports = router