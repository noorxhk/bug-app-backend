const express = require('express');
const router = express.Router();
const bugsController = require('../controllers/bug/BugsController')

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('bug_screenshot'), bugsController.create_bug)

router.put('/:id', upload.single('bug_screenshot'), bugsController.update_bug)

router.get('/:id', bugsController.get_bug);

router.delete('/:id', bugsController.delete_bug);

router.get('/:id/creator', bugsController.bug_creator );


module.exports = router