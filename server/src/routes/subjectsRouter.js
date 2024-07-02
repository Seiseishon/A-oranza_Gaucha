const express = require('express');
const subjectsController = require('../controllers/subjectsController');
const router = express.Router();

router.get("/subjects", subjectsController.allSubjects);

module.exports = router