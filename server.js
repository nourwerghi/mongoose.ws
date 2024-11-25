
const express = require('express');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
const personRoutes = require('./routes/personRoutes'); 

const connectDB = require("./config/connectDB")

connectDB()


const mongoURI = process.env.MONGO_URI || 'your-default-mongodb-uri-here';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongoose'))
  .catch(err => console.error('Database connection error:', err));

app.use(express.json());

app.use('/api', personRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Mongoose API Project!');
});



app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
