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
  interests: { type: [{
    label: String,
    question: String,
    answer: String
  }], required: false, default: [] }
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
app.get('/get-interests/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ interests: user.interests });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/update-interests-questions/:userId', async (req, res) => {
    const userId = req.params.userId;
    const interests = [
      { label: 'politics', question: 'Was the 2024 Presidential Election Rigged?' },
      { label: 'food', question: 'Is Spray Cheese Real?' },
      { label: 'sports', question: 'Who Will Make It to the Super Bowl?' },
      { label: 'popCulture', question: 'Who Does Not Deserve a Grammy Nomination?' },
      { label: 'art', question: 'Is Fan Art a Real Art Form?' },
      { label: 'gaming', question: 'Valorant: Should Chamber Be Nerfed?' },
      { label: 'scienceEducation', question: 'Should University Tuition Cost Less?' },
      { label: 'tech', question: 'Is the Metaverse Innovation or Dystopian?' },
      { label: 'financeEconomics', question: 'What is your take on the current economic trends?' },
      { label: 'beauty', question: 'Sephora, Ulta Beauty, or Drugstore Products?' },
      { label: 'books', question: 'Is Harry Potter Really a Gryffindor?' },
      { label: 'business', question: 'Are Workers\' Unions Beneficial or Mutiny?' },
      { label: 'tvMovies', question: 'Should Disney Keep Making Live-Action Movies of Their Classics?' },
      { label: 'fashion', question: 'What\'s a Trend that Should Stop?' }
    ];
  
    try {
      // Update or insert the user's interests
      const updatedUser = await User.findOneAndUpdate(
        { userId: userId },
        { $set: { interests: interests } },
        { new: true, upsert: true }
      );
  
      res.status(200).json({ message: 'Interests updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating interests:', error);
      res.status(500).json({ message: 'Failed to update interests', error });
    }
  });

// Start server
app.listen(5001, () => {
  console.log('Server running on port 5001');
});

