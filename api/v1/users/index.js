const express = require("express");
let app = module.exports = express();

const dbCrud = require('./db/crud');
const dbOther = require('./db/other');

const parseData = require('./middleware/parse').parseData;

/* GET one item. */
app.get('/:id', function(req, res, next) {
	dbCrud.read(req.params.id)
		.then(foundItem => res.json(foundItem))
		.catch(error => res.status(500).json({error}));
});

/* Insert item */
app.post('/login', parseData, function(req, res, next){
	dbOther.getByEmail(req.body.email)
		.then((found) => {
			if(!!found) {
				res.status(200).json(found);
			} else {
				req.body.balance = 100;
				dbCrud.create(req.body);
			}
		})
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({error}));
});

app.put('/:id', function(req, res, next){
	dbCrud.update(req.params.id, req.body)
		.then((modifyInfo) => dbCrud.read(req.params.id))
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(400).json({error}));
});