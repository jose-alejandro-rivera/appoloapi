var express = require('express');
var router = express.Router();
//const connect  = require('../connect.js')
const { departament, getUsers, getIdUsers, createUsers, getTableUsers } = require('../controllers/ControllerUser')
const { getPrueba, tableUsers } = require('../controllers/ControllerTable')
const { initFlujo, crearFlujo} = require('../controllers/ControllerFlujo')

// apolo
/* GET home page. */
router.get('/', departament )
router.get('/users/getusers', getUsers)
router.get('/users/:id', getIdUsers )
router.post('/users', createUsers )
router.get('/table/users', tableUsers)
router.get('/flujo', initFlujo )
router.post('/flujo/crear', crearFlujo )



module.exports = router;
