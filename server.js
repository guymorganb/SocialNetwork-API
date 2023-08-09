// run mongosh in terminal to start database connection
// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connection');
const routes = require('./controllers');  
const PORT = process.env.PORT || 3003;


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes); // Use the defined routes

connectDB.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });