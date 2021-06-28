const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  age: {
    type: Number,
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  profilePic: {
    type: String,
  },
});

module.exports = mongoose.model("Member", memberSchema);
