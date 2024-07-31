const express = require('express');
const studentsControllers = require('../controllers/studentsControllers.js');
const router = express.Router();


//Busca a todos los estudiantes
router.get('/', studentsControllers.list);

//Busca a los estudiantes por su nombre
router.get('/search', studentsControllers.searchByName);

//Busca a un estudiante por su ID
router.get('/search/:id',studentsControllers.searchByPk);

//Crea a un estudiante
router.post('/create', studentsControllers.create);

//Actualizacion de un estudiante
router.put('/update/:id', studentsControllers.update);

//Elimina a un estudiante
router.delete('/delete/:id', studentsControllers.delete);

module.exports = router;
