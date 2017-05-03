const express = require("express");
const app = express();
const http = require('http').Server(app);
var global = require('./api/global');
global.io = require('socket.io').listen(http);

const favicon = require('serve-favicon');

const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
var routing = require("./api/routing");


let connect_uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/drone-cafe';
mongoose.connect(connect_uri);

// parse application/json
app.use(bodyParser.json());                        
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.use(favicon(__dirname + '/src/favicon.ico'));

app.use(express.static(__dirname + '/src/dist'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(routing);

app.get("*", (req, res) => {
    res.sendfile(path.resolve('src/dist/index.html'));
});

app.use(function(err, req, res, next) {
 
  console.log(err.message);
  let [errCode, errMessage] = err.message.split("|");
  code = errCode ? errCode : 500;
  message = errMessage ? errMessage : "Please check your log file!";

  res.status(code).send({message});
});


http.listen(8080, () => {
  console.log("App run!");
});