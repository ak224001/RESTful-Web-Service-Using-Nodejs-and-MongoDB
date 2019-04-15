var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/PeopleDB");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Successfully connected.");
});

require("./person.model");
