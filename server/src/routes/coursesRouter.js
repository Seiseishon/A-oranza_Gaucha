const express = require('express');
const coursesController = require('../controllers/coursesController');
const router = express.Router();

//Busca a todos los cursos
router.get('/courses/all', coursesController.list);

//Buscar cursos por ID
router.get('/course/search/:id', coursesController.searchByPk);

//Buscar cursos por su nombre
router.get('/course/search', coursesController.searchByName);

//Crear un curso
router.post('/course/create', coursesController.create);

//Actualizar un curso
router.put('/course/update/:id', coursesController.update);

//Eliminar un curso
router.delete('/course/delete/:id', coursesController.delete);


module.exports = router;