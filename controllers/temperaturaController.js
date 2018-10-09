var mongoose = require('mongoose');
var Temperatura = mongose.model('Temperatura');

//GET - Retorna la ultima temperatura registrada
exports.findLastTemperature = function(req, res) {
	Temperatura.find().sort([['fecha': -1]]).exec((err, tempe){
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(tempe);
	});
}
//POST - Guarda un registro
exports.addTemperature = function(req, res) {
	var temperatura = new Temperatura({
		temperatura: req.body.temperatura,
		fecha: new Date()
	});
	temperatura.save((err, tempe) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(tempe);
	});
}
