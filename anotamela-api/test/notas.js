var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_REST_HOST || api;
//var host = 'http://localhost:3000/'
var async = require('async');

request = request(host);

describe('recurso /notas', function(){
	
	describe('POST', function(){
		it('deberia retornar una nota nueva', function(done){
			var data = {
				"nota": 
				{
					"title": "Mejorando.la #Node-pro",
					"description" : "Introduccion a clase",
					"type" : "js",
					"body": "Soy el cuerpo del JSON"
				}
			};

			// crear solicitud de http enviando data
			request
				.post('/notas')
				.send(data)
			// Accept application/json
				.set('Accept', 'application/json')
			// Status code = 201
				.expect(201)
				.expect('Content-Type', /application\/json/)
				.end(function(err, res){
					var body = res.body;

					expect(body).to.have.property('nota');

					nota = body.nota;

					expect(nota).to.have.property('title', 'Mejorando.la #Node-pro');
					expect(nota).to.have.property('description', 'Introduccion a clase');
					expect(nota).to.have.property('type', 'js');
					expect(nota).to.have.property('body', 'Soy el cuerpo del JSON');
					//expect(nota).to.have.property('id');

					done();
				});
			// cuerpo de la solicitud debe tener una nota en JSON
			// nota debe tener una propiedad = "Mejorando.la #Node"
		});
	});

	describe('GET', function(){
		it('deberia obtener una nota existente', function(done){
			
			//POST data
			var data = {
				"nota": 
				{
					"title": "Mejorando.la #Node-pro",
					"description" : "Introduccion a clase",
					"type" : "js",
					"body": "Soy el cuerpo del JSON"
				}
			};
			var id;		

			async.waterfall([
				//POST
				function createNote(cb){
					request
						.post('/notas')
						.send(data)
						.set('Accept', 'application/json')
						.expect(201)
						.end(cb);
				},
				//GET
				function getNote(res, cb){

					id = res.body.nota.id;

					request
						.get('/notas/' + id)
						.expect(200)
						.expect('Content-Type', /application\/json/)
						.end(cb);
				},
				function assertions(res, cb){

					var nota = res.body.notas;
					expect(nota).to.have.property('title', 'Mejorando.la #Node-pro');
					expect(nota).to.have.property('description', 'Introduccion a clase');
					expect(nota).to.have.property('type', 'js');
					expect(nota).to.have.property('body', 'Soy el cuerpo del JSON');
					expect(nota).to.have.property('id', id);
					done();
				}
			], done);

		});
		it('deberia obtener todas las notas', function(done){

			//POST data
			var data = {

				"nota": 
				{
					"title": "Mejorando.la #Node-pro",
					"description" : "Introduccion a clase",
					"type" : "js",
					"body": "Soy el cuerpo del JSON"
				}
			};

			var data2 = {
				"nota": 
				{
					"title": "Hola",
					"description" : "Introduccion a clase",
					"type" : "js",
					"body": "Soy el cuerpo del JSON"
				}
			}
			var id;

			async.waterfall([
				//POST
				function createNote(cb){
					request
						.post('/notas')
						.send(data)
						.set('Accept', 'application/json')
						.expect(201)
						.end(cb);
				},
				function createSecondNote(res, cb)
				{
					request
						.post('/notas')
						.send(data2)
						.set('Accept', 'application/json')
						.expect(201)
						.end(cb);
				},
				function getAll(res, cb){
					request
						.get('/notas/')
						.expect(200)
						.expect('Content-Type', /application\/json/)
						.end(cb);
				},
				function final(res, cb){
					var body = res.body;

					expect(body).to.have.property('notas');
					expect(body.notas).to.be.an('array')
						.and.to.have.length.above(2);

					var notas = body.notas;
					done();
				}
			], done);
		});
	});
	
	describe('PUT', function (){
		it('Deberia actualizar una nota existente', function (done){
			//Crear una nota (POST)
			var data = {
				"nota": 
				{
					"title": "Mejorando.la #Node-pro",
					"description" : "Introduccion a clase",
					"type" : "js",
					"body": "Soy el cuerpo del JSON"
				}
			};
			var id;

			async.waterfall([

				function createNote(cb){

					request
						.post('/notas')
						.send(data)
						.set('Accept', 'application/json')
						.expect(201)
						.end(cb);
				},
				//GET
				function getNote(res, cb){

					id = res.body.nota.id;

					request
						.get('/notas/' + id)
						.expect(200)
						.expect('Content-Type', /application\/json/)
						.end(cb);
				},
				function updateNote(res, cb){

					var body = res.body;
					var notaActualizada = body.notas;

					notaActualizada.title = 'Eduardo Vázquez sí sabe escribir ejecución';
					request
						.put('/notas/' + id)
						.send(notaActualizada)
						.expect(200)
						.expect('Content-Type', /application\/json/)
						.end(cb);
				},
				function assertions(res, cb){
					
					var notaCambiada = res.body.nota;
					expect(notaCambiada).to.have.property('id', id);
					expect(notaCambiada).to.have.property('title', 'Eduardo Vázquez sí sabe escribir ejecución');
					expect(notaCambiada).to.have.property('description', 'Introduccion a clase');
					expect(notaCambiada).to.have.property('type', 'js');
					expect(notaCambiada).to.have.property('body', 'Soy el cuerpo del JSON');
					done();
				}

			],done);
			//Obtener nota creada (GET)
			//Modificar nota
			//Enviar nota actualizada (PUT)
			//evaluar que la nota se haya actualizado correctamente

		})
	});

	describe('DELETE', function(){
		it('deberia eliminar una nota existente', function (done){
			//crear una nota
			var data = {
				"nota": 
				{
					"title": "Mejorando.la #Node-pro",
					"description" : "Introduccion a clase",
					"type" : "js",
					"body": "Soy el cuerpo del JSON"
				}
			};
			var id;

			async.waterfall([

				function createNote(cb){
					
					request
						.post('/notas')
						.send(data)
						.set('Accept', 'application/json')
						.expect(201)
						.end(cb);

				},
				function deleteNote(res, cb){
					id = res.body.nota.id
					
					request
						.delete('/notas/' + id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(cb);
						
				},
				function assertions(res, cb){

					request
						.get('/notas/' + id)
						.expect(400)
						.end(cb);
				},
				function final(cb){
					done();
				}

			], done);
		})

	})
});