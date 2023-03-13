const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const Contacts = mongoose.model("Contacts", contactsSchema);

module.exports = Contacts;
