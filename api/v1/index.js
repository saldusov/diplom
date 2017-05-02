const express = require("express");
let app = module.exports = express();

let usersRouting = require("./users");
let ordersRouting = require("./orders");

// Sockets

app.use("/users", usersRouting);
app.use("/orders", ordersRouting);