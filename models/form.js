const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const schema = new Schema({
	name: { type: String, required: true, unique: true },
	slug: { type: String, required: true, unique: true },
	purpose: { type: String, required: true  },
	content: { type: Object, required: false },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("forms", schema);
