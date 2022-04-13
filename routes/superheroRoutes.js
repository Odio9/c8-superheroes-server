var express = require("express");
var router = express.Router();
var debug = require("debug")("server:routes");
const {
  getAllSuperheroes,
  createSuperhero,
} = require("../db/models/superheroModel");

router.get("/", async (req, res) => {
  try {
    debug("getting all superheroes");
    const superheroes = await getAllSuperheroes();
    res.send(superheroes);
  } catch (err) {
    debug(err.message);
  }
});

router.post("/", async (req, res) => {
  const newSuperhero = req.body;
  debug(`adding new superhero: ${newSuperhero.name}`);
  try {
    const addedSuperhero = await createSuperhero(newSuperhero);
    debug(
      `added new superhero: ${addedSuperhero.name} with _id ${addedSuperhero._id}`
    );
    res.send(addedSuperhero);
  } catch (err) {
    debug(`failed to add new superhero: ${newSuperhero.name}`);
    debug(err.message);
  }
});

module.exports = router;
