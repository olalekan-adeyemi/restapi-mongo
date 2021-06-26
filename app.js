const express = require('express')
require('dotenv').config()


//APP SERVER
const app = express()
const PORT = process.env.PORT || 4000



//START LISTENING ON PORT
app.listen(PORT, ()=> {
	`Application now running on port ${PORT}`
})