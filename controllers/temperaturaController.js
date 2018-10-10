var Temperatura = require("../models/temperatura");

//GET - Retorna la última temperatura registrada
exports.getLastTemperature = (req, res) => {
	Temperatura.find({},['temperatura', 'fecha'],{limit:1,sort:{fecha: -1}},(err, tempe) => {
		if(err) return res.status(500).send(err);
		res.status(200).json(tempe);
	});
};
//Get - Retorna histórico de temperaturas
exports.getAllTemperatures = (req, res) => {
    Temperatura.find({},['temperatura', 'fecha'],{sort:{fecha: 1}}, (err, tempe) => {
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
