const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    img: { type: String },
    propertyName: { type: String },
    address: { type: String, required: true },
    amenities: { type: String, required: true },
    price: { type: Number, required: true },
    review: { type: String, required: true },
    recommended: Boolean,
    comments: [],
  },
  { timestamps: true }
);

const property = mongoose.model("properties", propertySchema);

module.exports = property;
