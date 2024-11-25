const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// Create and Save a Record
router.post('/person', async (req, res) => {
  try {
    const { name, age, favoriteFoods } = req.body;
    const savedPerson = await personController.createAndSavePerson({ name, age, favoriteFoods });
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Many Records
router.post('/persons', async (req, res) => {
  try {
    const peopleArray = req.body;
    const savedPeople = await personController.createManyPeople(peopleArray);
    res.status(201).json(savedPeople);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find All by Name
router.get('/persons', async (req, res) => {
  try {
    const { name } = req.query;
    const people = await personController.findPeopleByName(name);
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find One by Favorite Food
router.get('/person/food', async (req, res) => {
  try {
    const { food } = req.query;
    const person = await personController.findOneByFood(food);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find by ID
router.get('/person/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const person = await personController.findPersonById(personId);
    if (!person) return res.status(404).json({ error: 'Person not found' });
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update a Person
router.put('/person/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const { favoriteFood } = req.body; 
      const updatedPerson = await personController.findEditThenSave(personId, favoriteFood);
      res.status(200).json(updatedPerson);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Delete by ID
router.delete('/person/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const deletedPerson = await personController.removeById(personId);
    if (!deletedPerson) return res.status(404).json({ error: 'Person not found' });
    res.status(200).json({ message: 'Person deleted', deletedPerson });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Many People by Name
router.delete('/persons', async (req, res) => {
  try {
    const { name } = req.query;
    const result = await personController.removeManyPeople(name);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Query with Chain Helpers
router.get('/persons/query', async (req, res) => {
  try {
    const results = await personController.queryChain();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
