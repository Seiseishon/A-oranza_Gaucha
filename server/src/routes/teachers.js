const { teacherscontrollers } = require('../controllers/teacherscontrollers');

const router = require('express').Router();

//Busca a todos los profesores
router.get('/', teacherscontrollers.list);

//Busca a un profesor por nombre
router.get('/search', teacherscontrollers.searchByName);

//Busca a un profesor por su ID
router.get('/search/:id', teacherscontrollers.searchByPk);

//Crea a un profesor
router.post('/create', teacherscontrollers.create);

//Actualizacion de un profe
router.put('/update/:id', teacherscontrollers.update);

//Elimina a un profesor
router.delete('/delete/:id', teacherscontrollers.delete);

module.exports = router;