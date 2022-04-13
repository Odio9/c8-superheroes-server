var express = require("express");
var router = express.Router();
var debug = require("debug")("server:routes");
const { getAllSuperheroes } = require("../db/models/superheroModel");

router.get("/", async (req, res, next) => {
  try {
    debug("getting all superheroes");
    const superheroes = await getAllSuperheroes();
    res.send(superheroes);
  } catch (err) {
    debug(err.message);
  }
});

module.exports = router;
