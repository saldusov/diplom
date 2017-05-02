const express = require("express");
let app = module.exports = express();

const indexFunction = require('./lib/indexFunctions');
const middleware = require('./middleware/parse');

app.get('/', middleware.parseQuery, function(req, res, next) {
	indexFunction.getOrders(req.mongo.match)
		.then(foundItems => res.json(foundItems))
		.catch(error => res.status(500).json({error}));
});

/* GET one item. */
app.get('/:id', function(req, res, next) {
	indexFunction.getOrderById(req.params.id)
		.then(foundItem => res.json(foundItem))
		.catch(error => res.status(500).json({error}));
});

/* Insert item */
app.post('/', middleware.parseData, function(req, res, next){
	indexFunction.addOrder(req.body)
		.then((order) => res.status(200).json(order))
		.catch((error) => res.status(400).json({error}));
});

app.post('/:id/:status', function(req, res, next) {
	indexFunction.changeStatusById(req.params.id, req.params.status)
		.then((modifyInfo) => res.status(200).json({status: 'ok'}))
		.catch((error) => res.status(400).json({error}));
});

app.put('/:id', function(req, res, next){
	indexFunction.updateOrder(req.params.id, req.body)
		.then((order) => res.status(200).json(order))
		.catch((error) => res.status(400).json({error}));
});