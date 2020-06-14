const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const schema = new Schema({
	appearsInHeader: { type: Boolean, default: false },
	name: { type: String, required: true, unique: true },
	slug: { type: String, required: true, unique: true },
	content: { type: Object, required: false },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("pages", schema);
