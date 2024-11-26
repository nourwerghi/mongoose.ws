
const express = require('express');
const app = express();
require('dotenv').config();
const personRoutes = require('./routes/personRoutes'); 

const connectDB = require("./config/connectDB")

connectDB()


app.use(express.json());

app.use('/api', personRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Mongoose API Project!');
});



app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
