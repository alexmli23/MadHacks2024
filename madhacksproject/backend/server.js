// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cors({ origin: 'http://localhost:3000' })); // allow cross-origin requests

const mongoURI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plain text for demo
  interests: { type: [String], required: false, default: [] },
  today: { type: String, required: false, default: ''},
  answer: { type: String, required: false, default: ''}
});

const User = mongoose.model('User', userSchema);

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare plain text passwords for demo
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password, // Plain text for demo
      interests: []
    });

    await newUser.save();
    console.log("User created successfully:", newUser);

    // Return userId for tracking
    res.status(201).json({ message: "User created successfully", userId: newUser._id.toString() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update interests route
app.post('/update-interests', async (req, res) => {
  const { userId, interests } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid userId:', userId);
      return res.status(400).json({ message: "Invalid user ID" });
    }

    console.log('Updating userId:', userId); // Debugging
    console.log('New interests:', interests); // Debugging

    const user = await User.findByIdAndUpdate(userId, { interests }, { new: true });

    if (!user) {
      console.error('User not found for userId:', userId);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Interests updated successfully", user });
  } catch (error) {
    console.error('Error updating interests:', error);
    res.status(500).json({ message: "Failed to update interests", error: error.message });
  }
});

// server.js
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare plain text passwords for demo
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    console.log("Login successful");
    res.status(200).json({ message: "Login successful!", userId: user._id }); // Include userId in the response
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// server.js
app.post('/answers-by-category', async (req, res) => {
  const { category } = req.body;

  try {
    // Find all users with the matching 'today' interest category
    const usersWithCategory = await User.find({ today: category }, 'answer');

    // Map results to get an array of answers
    const answers = usersWithCategory.map(user => user.answer);

    res.status(200).json({ answers });
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update "today" interest
app.post('/update-today', async (req, res) => {
    const { userId, interest } = req.body;
  
    if (!userId || !interest) {
      return res.status(400).json({ message: "Invalid input" });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the user.today is already filled
      if (user.today) {
        // If user.today is filled, update it with the new interest
        user.today = interest;
        await user.save();
        return res.status(200).json({ message: "Today interest updated successfully" });
      } else {
        // If user.today is not filled, send a message indicating no update
        user.today = interest;
        await user.save();
        return res.status(200).json({ message: "User's 'today' interest is not filled yet. updated." });
      }
    } catch (error) {
      console.error("Error updating today interest:", error);
      return res.status(500).json({ message: "Failed to update today interest" });
    }
  });
  
  app.get('/get-user-today/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId); // Assuming you have a User model
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send back the user's "today" interest
      res.status(200).json({ today: user.today });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });  

  app.post('/save-answer', async (req, res) => {
    const { userId, interest, answer } = req.body;
  
    // Check if all required fields are provided
    if (!userId || !interest || !answer) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      // Find the user by their userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Save the answer and today's interest in the user's document
      user.answer = answer; // Save the provided answer
      user.today = interest; // Store the current interest (this could be useful if you want to track daily questions)
  
      // Save the updated user document
      await user.save();
  
      // Send a success response
      res.status(200).json({ message: 'Answer saved successfully' });
    } catch (error) {
      console.error('Error saving answer:', error);
      res.status(500).json({ message: 'Error saving answer' });
    }
  });

  app.post('/find-user', async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const user = await User.findById(userId);
      console.log("found user " + user);
  
      if (!user) {
        console.log("user not found");
        return res.status(404).json({ message: 'User not found' });
      }
  
      const answer = user.answer;
      const interest = user.today;
  
      res.status(200).json({ 
        message: 'User answer and today found',
        answer: answer,
        todayInterest: interest
      });
    } catch (error) {
      console.error('Error finding answer:', error);
      res.status(500).json({ message: 'Error finding answer' });
    }
  });  

  app.post('/answers-by-category', async (req, res) => {
    const { category } = req.body;
    try {
      // Assuming you have a MongoDB collection named "answers"
      const answers = await db.collection('answers').find({ category }).toArray();
      res.status(200).json({ answers });
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.get('/get-interests/:userId', async (req, res) => {
    const { userId } = req.params;
    
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ interests: user.interests });
    } catch (error) {
      console.error("Error fetching interests:", error);
      res.status(500).json({ message: "Failed to fetch interests" });
    }
  });
  

// Start server
app.listen(5001, () => {
  console.log('Server running on port 5001');
});