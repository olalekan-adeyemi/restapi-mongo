
// eslint-disable-next-line no-unused-vars
const getBase = (req, res, next) => {

	res.setHeader('Content-Type', 'application/json')
	res.status('200').json({
		base: 'hit the base url',
		status: 200
	})
}

const getProducts = (req, res) => {
	res.status('200').json({message: 'Handling get route for products'})
}

const postProduct = (req, res) => {
	const { name, price } = req.body
	res.status('201').json({success: true, message: 'new product added'})
}




module.exports = { home: getBase, get: getProducts, post: postProduct }