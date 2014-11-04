/**
	Requires
**/
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./lib/notas/model');

var server = express();

/**
	Middleware
**/
server.use(bodyParser.json('application/json'));
server.use(cors());
/**
	Routes
**/
var notas = require('./lib/notas');
server.use(notas);

/**
	Listening
**/
if (!module.parent)
{
	server.listen(3000, function (){
		console.log('Hola anotamela está listo :3');
	});
}
else
{
	module.exports = server;
}