const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const schema = new Schema({
	content: { type: Object, required: false },
	createdAt: { type: Date, default: Date.now },
	origin: { type: String, required: true }
});

module.exports = mongoose.model("message", schema);
