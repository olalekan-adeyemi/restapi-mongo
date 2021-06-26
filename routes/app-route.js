const express = require('express')
const router = express.Router()

const appController = require('../controllers/app-controller')

router.get('/', appController.home)


router.get('/product', appController.get)
router.post('/product', appController.post)


module.exports = router