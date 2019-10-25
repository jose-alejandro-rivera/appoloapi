const express = require('express')
const { getAlluser, getIdUsers } = require('../controllers/ControllerApi')
const router = express.Router()

/** CONNECT API REST **/
router.get('/users', getAlluser )
router.get('/users/:id', getIdUsers )

module.exports = router