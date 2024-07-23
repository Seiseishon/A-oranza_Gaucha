const express = require('express');
const coursesController = require('../controllers/coursesController');
const router = express.Router();

router.get('/courses/all', coursesController.list);
router.get('/course/:id', coursesController.search)

module.exports = router;