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

const getSuperheroById = async (id) => {
  const superhero = await Superhero.findById(id);
  console.log(`superhero is ${superhero}`);
  return superhero;
};

const updateSuperhero = async (id, updateData) => {
  const updatedSuperhero = await Superhero.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedSuperhero;
};

module.exports = {
  getAllSuperheroes,
  createSuperhero,
  getSuperheroById,
  updateSuperhero,
};
