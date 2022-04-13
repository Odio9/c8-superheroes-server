const mongoose = require("../mongoose");

const { Schema, model } = mongoose;

const superheroSchema = new Schema({
  name: { type: String, required: true, unique: true },
  superpowers: [String],
  alterEgo: String,
  durability: String,
});

const Superhero = model("Superhero", superheroSchema);

const createSuperhero = async (superhero) => {
  const newSuperhero = await Superhero.create(superhero);
  return newSuperhero;
};

const getAllSuperheroes = async () => {
  const superheroes = await Superhero.find();
  return superheroes;
};

module.exports = { getAllSuperheroes, createSuperhero };
