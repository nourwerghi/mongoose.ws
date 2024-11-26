const mongoose = require('mongoose');

const connectDB = () =>{
mongoose
.connect("mongodb+srv://nourwerghi:nourwerghi@cluster1.cuirx.mongodb.net/mongoose_contact?retryWrites=true&w=majority&appName=Cluster1") 
.then(() => console.log('Connected to Mongoose'))
.catch(err => console.error('Connection error', err));
}
module.exports = connectDB


