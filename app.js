const express = require('express')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()


//APP SERVER
const app = express()
const PORT = process.env.PORT || 4000

//Connect mongo database
const uri = 'mongodb+srv://mg_atlas:' + process.env.DATABASE_PASSWORD + '@app-cluster.bgdyk.mongodb.net/restapi-mgdb?retryWrites=true&w=majority'

mongoose.connect(uri, 
	{
		useNewUrlParser: true, 
		useUnifiedTopology: true,
	}, (err, result)=> { 
		if(err) {
			console.log('error connecting to database: ' + err)
		}else {
			console.log('connected to mongoDB: ' + result)
		}
		
	})


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