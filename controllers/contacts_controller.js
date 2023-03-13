const express = require("express");
const home = express.Router();

const Contacts = require("../models/contacts_schema.js");

home.post("/", (req, res) => {
  console.log(req.body);
  try {
    res.json(Contacts.create(req.body));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = home;
