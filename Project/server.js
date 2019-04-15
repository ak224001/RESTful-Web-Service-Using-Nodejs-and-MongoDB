require("./models/db");
const express = require("express");
const path = require("path");
const personController = require("./controllers/personController");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

const app = express();
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(bodyparser.json());

app.set("views", path.join(__dirname, "views"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      isChecked: (arg1, arg2) => {
        return arg1 === arg2 ? "checked" : "";
      }
    }
  })
);

app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("Express server started at port:" + app.get("port"));
});

app.use("/person", personController);
