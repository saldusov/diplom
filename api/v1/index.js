const express = require("express");
let app = module.exports = express();

let usersRouting = require("./users");
let ordersRouting = require("./orders");

// Sockets
//require("./payments/socket");

app.use("/users", usersRouting);
app.use("/orders", ordersRouting);