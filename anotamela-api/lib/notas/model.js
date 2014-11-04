var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/anotamela')

var NotaSchema = new Schema({
	title: 'string',
	type: 'string',
	description: 'string',
	body: 'string',
});

NotaSchema.virtual('id').get(function (){
	return this._id.toHexString();
});

NotaSchema.set('toObject', {
	virtuals: true
});

var model = mongoose.model('nota', NotaSchema);
module.exports = model;