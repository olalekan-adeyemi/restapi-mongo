const express = require('express')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()


//APP SERVER
const app = express()
const PORT = process.env.PORT || 4000




//declare middlewares
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//route paths
const appRoute = require('./routes/app-route')

//add routes
app.use(appRoute)




//START LISTENING ON PORT
app.listen(PORT, ()=> {
	console.log(`Application now running on port ${PORT}`)
})