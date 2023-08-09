const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const username = encodeURIComponent(process.env.MONGOADMIN);
    const password = encodeURIComponent(process.env.MONGOPASS);
    const dbName = 'test'; // Connects to lowercase 't'est database

    const mongoURI = `mongodb://${username}:${password}@localhost:27017/${dbName}?authSource=${dbName}`;

    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;