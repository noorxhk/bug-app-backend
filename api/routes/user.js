const express = require('express');
const router = express.Router();
const  Authentication  = require("../../middleware/Authentication");

const usersController = require('../controllers/user/UsersController')


router.put('/:id', usersController.update_user);
router.get('/:id/projects',Authentication.authenticate, usersController.user_projects);
router.get('/:id', usersController.get_user);
router.post('/sign-out', usersController.sign_out );
router.post('/developers', usersController.get_developers);

module.exports = router