const { teacherscontrollers } = require('../controllers/teacherscontrollers');

const router = require('express').Router();

router.get('/detail', teacherscontrollers.teachersAll)


module.exports = router