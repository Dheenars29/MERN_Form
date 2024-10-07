const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/biodataDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Define a schema for user bio-data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    address: String,
    phone: String
});

// Create a model
const User = mongoose.model('User', userSchema);

// POST route to add new user bio-data
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: 'User bio-data saved successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error saving user bio-data', error: err });
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
