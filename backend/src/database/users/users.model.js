const mongoose = require("mongoose");
const statics = require("./users.statics");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

UserSchema.statics = statics;
module.exports = mongoose.model("User", UserSchema);
