const mongoose = require("mongoose");

const dbURI = "mongodb://admin:4hMOi0JK3rwzmuaz@cluster0-shard-00-00-9lajs.mongodb.net:27017,cluster0-shard-00-01-9lajs.mongodb.net:27017,cluster0-shard-00-02-9lajs.mongodb.net:27017/temperatura?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

const options = {
	reconnetTries: Number.MAX_VALUE,
	poolSize: 10
};

mongoose.connect(dbURI, options).then(
	() => {
		console.log("Connection success!");
	},
	err => {
		console.log("Error connecting Database: ", err);
	}
);
require("../models/temperatura");
