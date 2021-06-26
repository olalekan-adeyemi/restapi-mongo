const express = require('express')
const router = express.Router()

const appController = require('../controller/app-controller')

router.get('/', appController.home)


module.exports = router