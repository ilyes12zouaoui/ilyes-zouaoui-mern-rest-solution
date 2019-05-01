const express = require("express");
const app = express();
const allRoutes = require("./routes/Routes");
const passport = require("passport");
const mongoose = require("mongoose");

//passport jwt initialisation
require("./configs/passport")(passport);

//connecting to mongodb
require("./configs/mongodbConnexion")(mongoose);

//adding middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//allowing cros origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",

    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

//adding routes
app.use("/api", allRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on" + port);
});
