const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Person = mongoose.model("People");
const expressValidator = require("express-validator");
const { check } = require("express-validator/check");

router.get("/", (req, res) => {
  res.render("person/home", {
    viewTitle: "Insert Person"
  });
});
router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req.body, res);
  } else {
    updateRecord(req.body, res);
  }
});
function insertRecord(req, res) {
  var person = getPersonFromRequest(req);
  person.save((err, doc) => {
    if (!err) {
      res.redirect("person/list");
    } else {
      handleValidationError(err, person);
      person._id = null;
      res.render("person/home", {
        viewTitle: "Insert Person",
        person
      });
    }
  });
}

function updateRecord(req, res) {
  var person = getPersonFromRequest(req);
  Person.findOneAndUpdate(
    {
      _id: person._id
    },
    person,
    { upsert: false, runValidators: true },
    (err, doc) => {
      if (!err) {
        res.redirect("person/list");
      } else {
        handleValidationError(err, person);
        res.render("person/home", {
          viewTitle: "Update Person",
          person
        });
      }
    }
  );
}
router.get("/delete/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, person) => {
    if (!err) {
      res.redirect("/person/list");
    } else {
      console.log("Error in person delete :" + err);
    }
  });
});

router.get("/list", (req, res) => {
  Person.find((err, docs) => {
    if (!err) {
      res.render("person/list", {
        list: docs
      });
    } else {
      console.log("Error in retrieving person list:" + err);
    }
  });
});
router.get("/:id", (req, res) => {
  Person.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("person/home", {
        viewTitle: "Update person",
        person: doc
      });
    }
  });
});
function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "name":
        body["nameError"] = err.errors[field].message;
        break;
      case "age":
        body["ageError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

function getPersonFromRequest(req) {
  var person = new Person();
  if (req._id) {
    person._id = req._id;
  }
  person.name = req.name;
  person.age = req.age;
  person.mobile = req.mobile;
  person.gender = req.gender;

  return person;
}

module.exports = router;
