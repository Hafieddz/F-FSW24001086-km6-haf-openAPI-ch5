const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age : {
    type : Number,
    required : true
  },
  address : {
    type : String,
  },
  role: {
    type: String,
    enum: ["Super Admin", "Admin", "Member"],
    default: "Member",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
