const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const username = encodeURIComponent(process.env.MONGOADMIN);
    const password = encodeURIComponent(process.env.MONGOPASS);
    const dbName = 'socialMediaRestAPI'; // Connects to lowercase 't'est database
    // The options {useNewUrlParser: true, useUnifiedTopology: true} are provided to avoid deprecation warnings.
    const mongoURI = `mongodb://${username}:${password}@localhost:27017/${dbName}?authSource=${dbName}`;

    await mongoose.connect(`mongodb://${process.env.MONGOADMIN}:${process.env.MONGOPASS}@localhost:27017`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'socialMediaRestAPI',
      dbName: 'socialMediaRestAPI'  
    });
    console.log(`Connected to MongoDB, DB:${dbName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;