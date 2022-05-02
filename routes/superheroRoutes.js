var express = require("express");
var router = express.Router();
var debug = require("debug")("server:routes");
const {
  getAllSuperheroes,
  createSuperhero,
  getSuperheroById,
  updateSuperhero,
} = require("../db/models/superheroModel");

const mustBeAgent = (req, res, next) => {
  console.log("reached mustBeAgent middleware");
  if (req.user && req.user.isAgent) {
    return next();
  }
  res.sendStatus(401);
};

const mustBeOwnProfile = (req, res, next) => {
  const id = req.params.id;
  if (req.user && (req.user.isAgent || req.user.superheroId === id)) {
    return next();
  }
  res.sendStatus(401);
};

router.get("/", async (req, res) => {
  console.log(`req.user is ${req.user}`);
  try {
    debug("getting all superheroes");
    const superheroes = await getAllSuperheroes();
    res.send(superheroes);
  } catch (err) {
    debug(err.message);
  }
});

router.post("/", mustBeAgent, async (req, res) => {
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

router.get("/:id", async (req, res) => {
  req.params; // { id: '_______' }

  const id = req.params.id;

  debug(`:id is (${id})`);
  try {
    const superhero = await getSuperheroById(id);
    return res.send(superhero);
  } catch (ex) {
    debug(`EXCEPTION in superheroes/:id (${id}):`, ex.message);
    return res.status(500).send(ex.message);
  }
  res.send("yippee!");
});

router.put("/:id", mustBeOwnProfile, async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const updatedSuperhero = await updateSuperhero(id, updateData);
    debug(
      `Updated superhero with _id ${updatedSuperhero._id} to ${updatedSuperhero} `
    );
    res.send(updatedSuperhero);
  } catch (err) {
    debug(`failed to edit superhero: ${newSuperhero.name}`);
    debug(err.message);
    res.status(500).send("Error in data. Please try again.");
  }
});

module.exports = router;
