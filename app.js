const path = require("path");
//npm i --save helmet compression body-parser dotenv express  mongoose cors
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const session = require("express-session");
//var csrf =require('csurf')
//var multer = require("multer")
require("dotenv").config();
var cors = require("cors");
const helmet = require("helmet");
var compression = require("compression");

const app = express();
const tasksRoutes = require('./routes/tasks')
const URI_LINK = process.env.MONGODB_CONNECTION_LINK;

app.use(cors());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('./public'));
app.use(express.json());

app.use(helmet());

app.use("/api",tasksRoutes)
app.use("/500", (req, res, next) => {
  res.send("<h1> server erro </h1>");
});

app.use( (req, res, next) => {
  res.send("<h1> 404 page not found </h1>");
});

mongoose
  .connect(URI_LINK)
  .then((result) => {
    console.log("connected");

    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
