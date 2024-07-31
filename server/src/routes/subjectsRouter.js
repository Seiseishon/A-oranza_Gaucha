const express = require('express');
const subjectsController = require('../controllers/subjectsController');
const router = express.Router();


//Busca todas las materias
router.get("/subjects", subjectsController.allSubjects);

//Busca las materias por su nombre
router.get('/subjects/search', subjectsController.searchByName);

//Busca una materia por su ID
router.get('/subjects/search/:id', subjectsController.searchByPk);

//Crear una materia
router.post('/subject/create', subjectsController.create);

//Actualizar una materia
router.put('/subject/update/:id', subjectsController.update);

//Eliminar una materia
router.delete('/subject/delete/:id', subjectsController.delete);

module.exports = router;