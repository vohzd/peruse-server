const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const schema = new Schema({
	secretKey: {type: String, required: true },
	publishableKey: {type: String, required: true },
});

module.exports = mongoose.model("stripe", schema);
