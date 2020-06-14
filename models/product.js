const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const schema = new Schema({
	name: {type: String, required: false },
	slug: {type: String, required: false, unique: true},
	price: { type: String, required: false },
	images: { type: Array, required: false },
	categories: { type: Array, required: false },
	stock: { type: Number, required: false },
	description: { type: String, required: false },
	views: { type: Number, required: false },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("products", schema);
