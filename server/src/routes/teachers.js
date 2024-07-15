const { teacherscontrollers } = require('../controllers/teacherscontrollers');

const router = require('express').Router();

//Busca a todos los profesores
router.get('/', teacherscontrollers.list)

//Busca a un profesor
router.get('/detail/:id', teacherscontrollers.search)

//Crea a un profesor
router.post('/create', teacherscontrollers.create)

//Elimina a un profesor
router.delete('/delete/:id', teacherscontrollers.delete)

module.exports = router