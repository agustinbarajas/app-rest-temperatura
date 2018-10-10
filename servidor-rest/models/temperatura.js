const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const temperaturaSchema = new Schema({
		temperatura: { type: Number, required: true },
		fecha: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Temperatura', temperaturaSchema);
