var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var peopleSchema = new Schema({
  name: {
    type: String,
    required: "name must be provided"
  },
  age: {
    type: Number,
    required: "age must be provided"
  },
  mobile: Number,
  gender: {
    type: String
  }
});
mongoose.model("People", peopleSchema);
