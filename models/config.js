const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const schema = new Schema({
	name: { type: String, required: false },
	description: { type: String, required: false },
	ecommerce: { type: Object, required: false, default: {} },
	keywords: { type: String, required: false },
	colours: { type: Object, required: false },
	logo: { type: String, required: false }
});

module.exports = mongoose.model("config", schema);
