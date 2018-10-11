var express	= require("express"),
    app		= express(),
    bodyParser	= require("body-parser"),
    temperaturaController = require("./controllers/temperaturaController");

require("./config/db");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//APIS
app.route("/temperatura")
    .get(temperaturaController.getLastTemperature)
    .post(temperaturaController.addTemperature);
app.route("/temperatura/historico")
    .get(temperaturaController.getAllTemperatures);
app.route("/temperatura/grafica")
    .get(temperaturaController.getTemperatureLastTwoDays);

app.listen(port, () =>{
	console.log("Servidor escuchando");
});
