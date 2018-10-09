var mongoose = require('mongoose');
var Temperatura = mongose.model('Temperatura');

//GET - Retorna la ultima temperatura registrada
exports.getLastTemperature = function(req, res) {
	Temperatura.find().sort([['fecha': -1]]).exec((err, tempe){
		if(err) return res.status(500).send(err);
		res.status(200).json(tempe);
	});
}
//POST - Guarda un registro
exports.addTemperature = function(req, res) {
	var temperatura = new Temperatura({
		temperatura: req.body.temperatura,
		fecha: new Date()
	});
	temperatura.save((err, tempe) {
		if(err) return res.status(500).send(err);
		res.status(200).json(tempe);
	});
}
