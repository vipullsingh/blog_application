const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const app = express();

// Middleware
app.use(cors()); // Use cors middleware to allow all origins by default
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);
app.get('/',(req,res)=>{
    res.send("Welcome to BlogApp Backend")
})

module.exports = app;
