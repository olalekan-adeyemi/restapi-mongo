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
    
	Product.find().select('_id name price')
		.then(product => {
            
			const response = {
				count: product.length,
				products: product.map(product => {
					return {
						name: product.name,
						price: product.price,
						_id: product._id,
						request: {
							type: 'GET',
							url: 'http://localhost:4000/api/products/' + product._id
						}
					}
				})
			}
			res.status('200').json({message: 'Handling get route for products', product: response})
		})
		.catch(err => { 
			console.log(err)
			res.status('400').json({message: 'Handling get route for products', product: 'no products found'})
		})
	
}

const postProduct = (req, res) => {

	const { name, price } = req.body

	if(name === undefined || price == undefined) {

		res.status('400').json({status: false, message: 'nothing addeed'})
		
	}else {
		const product = new Product({
			_id: new mongoose.Types.ObjectId(),
			name: name,
			price: price
		})
        
		product.save() 
			.then(result => {
				console.log(result)
				res.status('201').json({success: true, message: 'new product added', created: {
					name: product.name,
					price: product.price,
					request: {
						method: 'GET',
						url: 'http://localhost:4000/api/products/' + product._id 
					}
				}})
			})
			.catch( err => {
				console.log(err)
				res.status('500').json({success: true, message: 'new product added', product: product})
			})
	}

	
}


const findOneProduct = (req, res) => {
	const id = req.params.id
	Product.findById(id)
		.then(product => {
			if(product) {
				res.status(200).json({success: true, created: {
					name: product.name,
					price: product.price,
					request: {
						method: 'GET',
						url: 'http://localhost:4000/api/products/' + product._id 
					}
				}})
			}else {
				res.status(404).json({success: true, message: 'product not found'})
			}
		
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({success: false, message: 'not found', error: err})
		})
}


const deleteOneProduct = (req, res) => {
	const id = req.params.id
	Product.remove({_id: id})
		.then(product => {
			if(product) {
				res.status(200).json({success: true, message: 'product deleted', 
					request: {method: 'POST', url: 'http://localhost:4000/api/products', body: {name: 'String', price: 'Number'}}
				})
			}else {
				res.status(200).json({success: true, message: 'No product to delete', result: product})
			}
		
		
		})
		.catch(err => {
			res.status(400).json({success: false, message: 'an error occured', error: err})
		})

}


const patchOneProduct = (req, res) => {

	const id = req.params.id
	const updateOps = {}
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}

	Product.updateOne({_id: id}, {$set: updateOps})
		.then(result => {
			res.status(200).json({result: result})
		})
		.catch(err => {
			res.status(500).json({error: err})
		})
}


module.exports = { home: getBase, get: getProducts, post: postProduct, findOne: findOneProduct , deleteOne: deleteOneProduct, patchOne: patchOneProduct}