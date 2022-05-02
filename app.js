const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const superheroRouter = require("./routes/superheroRoutes");
const authRouter = require("./routes/authRoutes");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: "apple" }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/superheroes", superheroRouter);
app.use("/auth", authRouter);
module.exports = app;
