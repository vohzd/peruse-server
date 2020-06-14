const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;

const schema = new Schema({
	createdAt: { type: Date, default: Date.now },
	deliveryAddress: { type: Object, required: false },
	deliveryCost: { type: Number, required: true },
	origin: { type: String, required: true },
	status: { type: String, default: "unpurchased" },
	transactionID: { type: String, required: false },
	items: { type: Object, required: true },
	user: { type: Object, required: true }
});

module.exports = mongoose.model("order", schema);
