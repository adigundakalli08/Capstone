// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/civilloan', {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Connection error:', err));