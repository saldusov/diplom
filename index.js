const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var routing = require("./api/routing");


//mongoose.connect('mongodb://localhost:27017/medtest');

// parse application/json
app.use(bodyParser.json());                        
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/src/dist'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(routing);

app.use(function(err, req, res, next) {
 
  console.log(err.message);
  let [errCode, errMessage] = err.message.split("|");
  code = errCode ? errCode : 500;
  message = errMessage ? errMessage : "Please check your log file!";

  res.status(code).send({message});
});

app.listen(3000, () => {
  console.log("App run!");
});