const express = require('express');
const studentsControllers = require('../controllers/studentsControllers.js');
const router = express.Router();


//Busca a todos los estudiantes
router.get('/', studentsControllers.list)

//Busca a un solo estudiante
router.get('/search', studentsControllers.search)

//Crea a un estudiante
router.post('/create', studentsControllers.create)

//Actualizacion de un estudiante
router.put('/update/:id', studentsControllers.update)

//Elimina a un estudiante
router.delete('/delete/:id', studentsControllers.delete)

module.exports = router;