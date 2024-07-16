const { teacherscontrollers } = require('../controllers/teacherscontrollers');

const router = require('express').Router();

//Busca a todos los profesores
router.get('/', teacherscontrollers.list)

//Busca a un profesor
router.get('/search', teacherscontrollers.search)

//Crea a un profesor
router.post('/create', teacherscontrollers.create)

//Actualizacion de un profe
router.put('/update/:id', teacherscontrollers.update)

//Actualizacion de un profe parcialmente
router.patch('/update/:id', teacherscontrollers.partialUpdate)

//Elimina a un profesor
router.delete('/delete/:id', teacherscontrollers.delete)

module.exports = router