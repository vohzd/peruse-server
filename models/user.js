const mongoose                            = require("mongoose");
const bcrypt                              = require("bcrypt");
const Schema                              = mongoose.Schema;

const user = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
	name: {type: String, required: true, trim: true },
  isAdmin: { type: Boolean, required: false },
	createdAt: {type: Date, default: Date.now }
});

user.pre("save", async function(next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

user.methods.isValidPassword = async function(password){
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

module.exports = mongoose.model("user", user);
