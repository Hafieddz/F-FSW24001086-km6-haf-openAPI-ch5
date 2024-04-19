const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rentPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
