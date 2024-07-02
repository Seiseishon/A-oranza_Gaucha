const express = require('express');
const coursesController = require('../controllers/coursesController');
const router = express.Router();

router.get('/courses/all', coursesController.allCourses);
router.get('/course/:id', coursesController.findCourse)

module.exports = router;