const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cors()); // to allow cross-origin requests

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

// MongoDB connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Define User model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    interests: { type: [String], required: false, default: [] }
});

const User = mongoose.model('User', userSchema);

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ name: username }); // or use email if you prefer email for login
  
      if (!user) {
        console.log("username not found");
        return res.status(400).json({ message: "User not found!" });
      }
  
      // Compare passwords
      if (password !== user.password) {
        console.log("password not right");
        return res.status(400).json({ message: "Invalid credentials!" });
      }
  
      console.log("login successful");
      res.status(200).json({ message: "Login successful!", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const newUser = new User({
        name,
        email,
        password, // You should hash the password in a real-world scenario
        interests: []
      });
      await newUser.save();
      console.log("user created successfully: " + newUser);
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.log("error creating user");
      res.status(400).json({ error: error.message });
    }
});

// Start server
app.listen(5001, () => {
  console.log('Server running on port 5001');
});