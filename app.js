require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const allowCors = require("./middleware/cors");

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(allowCors);

app.get("/", (req, res) => {
  res.send({
    message: "server connected successfully",
  });
});

app.use(router);

module.exports = app;
