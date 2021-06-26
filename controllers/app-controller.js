const mongoose = require('mongoose')
const Product = require('../model/product')

// eslint-disable-next-line no-unused-vars
const getBase = (req, res, next) => {

	res.setHeader('Content-Type', 'application/json')
	res.status('200').json({
		base: 'hit the base url',
		status: 200
	})
}

const getProducts = (req, res) => {

	Product.find().then(product => {
		res.status('200').json({message: 'Handling get route for products',product: product})
	}).catch(err => { 
		console.log(err)
		res.status('400').json({product: 'no products found',message: 'Handling get route for products'})
	})
	
}

const postProduct = (req, res) => {

	const { name, price } = req.body

	if(name === undefined || price == undefined) {

		res.setHeader('Content-Type', 'application/json')
		res.status('400').json({status: false, message: 'nothing addeed'})
		
	}else {
		console.log(name, price)
		//const product = {name: name, price: price}

		const product = new Product({
			_id: new mongoose.Types.ObjectId(),
			name: name,
			price: price
		})

		product.save().then(result => console.log(result)).catch( err => console.log(err))

		res.setHeader('Content-Type', 'application/json')
		res.status('201').json({success: true, message: 'new product added', product: product})

	}

	
}




module.exports = { home: getBase, get: getProducts, post: postProduct }