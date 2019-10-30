const express = require('express')
const { initFlujo, crearFlujo } = require('../controllers/ControllerFlujo')
const router = express.Router() 

/** CONNECT API REST **/
router.get('/flujo', initFlujo )
router.post('/flujo/crear', crearFlujo )

module.exports = router