const express = require("express");
let app = module.exports = express();

const dbCrud = require('./db/crud');
const dbOther = require('./db/other');

const middleware = require('./middleware/parse');

app.get('/', middleware.parseQuery, function(req, res, next) {
	dbOther.get(req.mongo.match)
		.then(foundItems => res.json(foundItems))
		.catch(error => res.status(500).json({error}));
});

/* GET one item. */
app.get('/:id', function(req, res, next) {
	dbCrud.read(req.params.id)
		.then(foundItem => res.json(foundItem))
		.catch(error => res.status(500).json({error}));
});

/* Insert item */
app.post('/', middleware.parseData, function(req, res, next){
	dbCrud.create(req.body)
		.then((order) => res.status(200).json(order))
		.catch((error) => res.status(400).json({error}));
});

app.put('/:id', function(req, res, next){
	dbCrud.update(req.params.id, req.body)
		.then((modifyInfo) => dbCrud.read(req.params.id))
		.then((order) => res.status(200).json(order))
		.catch((error) => res.status(400).json({error}));
});