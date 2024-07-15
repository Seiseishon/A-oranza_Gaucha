const express = require('express');
const studentsControllers = require('../controllers/studentsControllers.js');
const router = express.Router();


//Busca a todos los estudiantes
router.get('/', studentsControllers.list)

//Busca a un solo estudiante
router.get('/detail/:id', studentsControllers.search)

//Crea a un estudiante
router.post('/create', studentsControllers.create)

//Elimina a un estudiante
router.delete('/delete/:id', studentsControllers.delete)

module.exports = router;