const express = require("express");
const logger = require("morgan");

const superheroRouter = require("./routes/superheroRoutes");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/superheroes", superheroRouter);

module.exports = app;
