const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;
const schema = new Schema({
	name: {type: String, required: true },
	location: {type: String, required: true, unique: true },
	size: { type: String, required: true },
	folder: { type: String, required: true },
	type: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("files", schema);
