const express = require('express')
const router = express.Router()

const appController = require('../controllers/app-controller')

router.get('/', appController.home)


router.get('/products', appController.get)
router.get('/products/:id', appController.findOne)
router.post('/product', appController.post)



module.exports = router