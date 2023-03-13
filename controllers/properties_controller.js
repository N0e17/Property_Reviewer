const express = require("express");
const home = express.Router();

const property = require("../models/properties_schema.js");

home.get("/new", (req, res) => {
  res.render("newProperty.ejs");
});

home.post("/", (req, res) => {
  if (req.body.recommended === "on") {
    req.body.recommended = true;
  } else {
    req.body.recommended = false;
  }
  property.create(req.body, (err, newProperty) => {
    if (err) {
      console.log(err);
    } else {
      //res.send(createdFruit);
      //res.send(createdFruit);
      res.redirect("/properties");
    }
  });
});

home.get("/", (req, res) => {
  property.find({}, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index.ejs", { properties: response });
    }
  });
});

home.get("/:id", (req, res) => {
  property.findById(req.params.id, (err, foundProperty) => {
    if (err) {
      console.log(err);
    } else {
      //res.send(foundFruit);
      res.render("viewProperty.ejs", { property: foundProperty });
    }
  });
});

home.get("/:id/edit", (req, res) => {
  //   res.send("Deleting...");
  property.findById(req.params.id, (err, foundProperty) => {
    if (err) {
      console.log(err);
    } else {
      res.render("editProperty.ejs", { property: foundProperty });
    }
  });
});

home.delete("/:id", (req, res) => {
  //   res.send("Deleting...");
  property.findByIdAndDelete(req.params.id, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/properties");
    }
  });
});

home.put("/:id", (req, res) => {
  if (req.body.recommended === "on") {
    req.body.recommended = true;
  } else {
    req.body.recommended = false;
  }
  property.findByIdAndUpdate(req.params.id, req.body, (err, update) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/properties/" + req.params.id);
    }
  });
});

home.post("/comment/:id", (req, res) => {
  property.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: req.body } },
    { new: true },
    (err, update) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/properties/" + req.params.id);
      }
    }
  );
});

module.exports = home;
