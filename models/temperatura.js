exports = module.exports = function(app, mongoose) {
	var temperatura = mongoose.Schema({
		temperatura:	{ type: Number },
		fecha:		{ type: Date }
	});
	mongoose.model('Temperatura', temperatura);
}
