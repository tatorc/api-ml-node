var express = require('express')
var router = express.Router()

const {index, show} = require('../controllers/mainController')

router.get('/items',     index)
router.get('/items/:id', show)

module.exports = router