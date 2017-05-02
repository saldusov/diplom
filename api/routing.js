const express = require("express");
let app = module.exports = express();

let v1 = require("./v1");

app.use('/api/v1', v1);


app.get("*", (req, res) => {
	res.render("index");
});