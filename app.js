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

app.listen(port, () =>{
	console.log("Servidor escuchando");
});
