// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 3000;

// app.listen(port);

// console.log('todo list RESTful API server started on: ' + port);


const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port)