
// eslint-disable-next-line no-unused-vars
const getBase = (req, res, next) => {

	res.setHeader('Content-Type', 'application/json')
	res.status('200').json({
		base: 'hit the base url',
		status: 200
	})
}




module.exports = { home: getBase }