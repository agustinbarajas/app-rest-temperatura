var Temperatura = require("../models/temperatura");

//GET - Retorna la última temperatura registrada
exports.getLastTemperature = (req, res) => {
	Temperatura.find({},{'temperatura':1, 'fecha':1, '_id':0},{limit:1,sort:{fecha: -1}},(err, tempe) => {
		if(err) return res.status(500).send(err);
		res.status(200).json(tempe);
	});
};
//Get - Retorna histórico de temperaturas
exports.getAllTemperatures = (req, res) => {
    Temperatura.find({},{'temperatura':1, 'fecha':1, '_id':0},{sort:{fecha: 1}}, (err, tempe) => {
        if(err) return res.status(500).send(err);
        res.status(200).json(tempe);
    });
};
//Get - Retorna las temperaturas de los últimos dos dias
const fechaHoy = new Date();
var fecha = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth(), fechaHoy.getDate() - 2);
exports.getTemperatureLastTwoDays = (req, res) => {
    Temperatura.find({'fecha': {'$gte': fecha}},{'temperatura':1, 'fecha':1, '_id':0},{sort:{fecha: 1}}, (err, tempe) => {
        if(err) return res.status(500).send(err);
        res.status(200).json(tempe);
    });
};
//POST - Guarda un registro
exports.addTemperature = (req, res) => {
	var temperatura = new Temperatura({
		temperatura: req.body.temperatura,
		fecha: new Date()
	});
	temperatura.save((err, tempe) => {
		if(err) return res.status(500).send(err);
		res.status(200).json(tempe);
	});
};
