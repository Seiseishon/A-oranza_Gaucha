const express = require('express');
const studentsControllers = require('../controllers/studentsControllers.js');
const router = express.Router();

//Creacion

router.get('/create', studentsControllers.studentAll)


module.exports = router;