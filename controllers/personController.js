const Person = require('../models/personModel'); 

const createAndSavePerson = async (req, res) => {
  try {
    const { name, age, favoriteFoods } = req.body;
    const newPerson = new Person({ name, age, favoriteFoods });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(500).json({ error: 'Error saving person', details: err.message });
  }
};

module.exports = {
  createAndSavePerson,
};
