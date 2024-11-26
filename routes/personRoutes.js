const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Person = require("../models/personModel")

// Create and Save a Record
router.post('/person', async (req, res) => {
  try {
    const newPerson = new Person(req.body)
    await newPerson.save()
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Many Records
router.post('/persons', async (req, res) => {
    try {
      const peopleArray = req.body; 
      const savedPeople = await Person.insertMany(peopleArray); 
      res.status(201).json(savedPeople); 
    } catch (err) {
      res.status(500).json({ error: err.message }); 
    }
  });
  

// Find All by Name
router.get('/persons/:name', async (req, res) => {
  try {
    const  name  = req.params.name;
    console.log(name)
    const people = await Person.find({name:name});
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find One by Favorite Food
router.get('/person/:food', async (req, res) => {
    try {
        const food = req.params.food;
        let person2 = null; 

        const persons = await Person.find();  
        console.log(persons);

        for (let i = 0; i < persons.length; i++) {
            for (let j = 0; j < persons[i].favoriteFoods.length; j++) {
                if (persons[i].favoriteFoods[j] === food) {
                    person2 = persons[i];  
                    break; 
                }
            }
            if (person2) break;  
        }

        if (!person2) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.status(200).json(person2);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Find by ID
router.get('/person/id/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
// Update a Person
router.put('/person/id/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const { age, favoriteFoods } = req.body;

    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    if (age !== undefined) {
      person.age = age;
    }
    if (favoriteFoods !== undefined) {
      person.favoriteFoods = favoriteFoods;
    }

    const updatedPerson = await person.save();

    res.status(200).json(updatedPerson);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

  
// Delete by ID
router.delete('/person/id/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json({ message: 'Person deleted successfully', deletedPerson });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// delete par name

router.delete('/persons', async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }
    const result = await Person.deleteMany({ name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No persons found with the specified name' });
    }

    res.status(200).json({
      message: `${result.deletedCount} person(s) deleted successfully`,
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// Query with Chain Helpers

     router.get('/persons/query', async (req, res) => {
        try {
    // Querying the database for people who like burritos
    const results = await Person.find({ favoriteFoods:{ $in: ['burger'] } }) // Filter for burrito lovers
      .sort({ name: 1 }) // Sort by name in ascending order
      .limit(2) // Limit results to two
      .select('-age') // Exclude the 'age' field
      .exec(); // Execute the query

    if (results == []) {
      return res.status(404).json({ message: "No persons found matching the criteria." });
    }

    res.status(200).json(results); // Return the results
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});


module.exports = router;
