const express = require('express');
const studentsControllers = require('../controllers/studentsControllers.js');
const router = express.Router();

//Creacion

router.get('/create', studentsControllers.create)


module.exports = router;