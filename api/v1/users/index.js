const express = require("express");
let app = module.exports = express();

const indexFunctions = require('./lib/indexFunctions');

const parseData = require('./middleware/parse').parseData;

/* GET one item. */
app.get('/:id', function(req, res, next) {
	indexFunctions.getUserById(req.params.id)
		.then(foundItem => res.json(foundItem))
		.catch(error => res.status(500).json({error}));
});

/* Insert item */
app.post('/login', parseData, function(req, res, next){
	indexFunctions.login(req.body)
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({error}));
});

app.put('/:id', function(req, res, next){
	indexFunctions.updateUser(req.params.id, req.body)
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({error}));
});