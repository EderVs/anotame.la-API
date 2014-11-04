/**
	Requires
**/
var app = require('express')();
var _ = require('lodash');
var Nota = require('./model');
/**
	Database
**/

/**
	Routes
**/
app.route('/notas/:id?')
	
	//Logging
	.all(function (req, res, next){
		console.log(req.method, req.path, req.body);
		res.set('Content-Type', 'application/json');
		next();
	})

	//POST
	.post(function (req, res, next){

		Nota.create(req.body.nota, function (err, nota){
			res
				.status(201)
				.json({
					nota: nota
				});

		});

	})

	//GET
	.get(function (req, res, next){
		var id = req.params.id;
		
		Nota.findById(id)

		if (!id){
			return next();
		}
		
		if (!nota){
			return res
				.status(400)
				.send({});
			
		}
		console.log('que tal')
		return res
			.status(200)
			.json({
				notas: nota
			});
	})

	//PUT
	.put(function (req, res, next){
		var id = req.params.id;
		var notaActualizada = req.body;
		db[id] = notaActualizada;

		res
			.status(200)
			.json({
				nota : db[id]
			});
	})

	//DELETE
	.delete(function (req, res){
		var id = req.params.id;

		Nota.remove({}, function(err){
			res
				.status(204)
				.send();

		});
	});

app.get('/notas/', function (req, res, next){
		Nota.find({}, function (err, notas){
		
			res
			.status(200)
			.set('Content-Type', 'application/json')
			.json({
				notas : notas
			});
		})
	});

/**
	Module export
**/

module .exports = app;