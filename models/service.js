const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const schema = new Schema({
	name: {type: String, required: true},
	slug: {type: String, required: true, unique: true },
	tiers: { type: Object, required: false },
	upsells: { type: Object, required: false },
	createdAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model("services", schema);
