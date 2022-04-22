var express = require("express");
var router = express.Router();
var debug = require("debug")("server:routes");
const {
  getAllSuperheroes,
  createSuperhero,
  getSuperheroById,
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
    res.status(500).send("Error in data. Please try again.");
  }
});

router.get('/:id', async (req, res) => {
  req.params; // { id: '_______' }
  
  const id = req.params.id;

  debug(`:id is (${id})`);
  try {
    const superhero = await getSuperheroById(id);
    return res.send(superhero);
  } catch(ex) {
    debug(`EXCEPTION in superheroes/:id (${id}):`, ex.message);
    return res.status(500).send(ex.message);
  }
  res.send("yippee!")
});


module.exports = router;
