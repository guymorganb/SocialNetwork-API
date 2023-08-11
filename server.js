// run mongosh in terminal to start database connection
// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connection');
const routes = require('./controllers');
const mongoose = require('mongoose');
mongoose.set('debug', true);  // prints database queries to terminal for debugging
const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.urlencoded({ extended: true })); // body parsing
app.use(express.json());
app.use(routes); // Use the defined routes

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();