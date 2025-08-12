
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';


// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with given email or username already exists
    const userExists = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      if (userExists.username === username) {
        return res.status(400).json({ message: 'Username is already taken ' });
      }
    }

    // Create a new user instance, Mongoose will validate it
    const user = new User({ username, email, password });
    await user.save(); // Save the user to the database, which triggers validation and hashing

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error occurred' });
  }
};

// login User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const logoutUser = (req, res) => {
  // Acknowledge the logout request
  res.status(200).json({ message: 'Logged out successfully' });
};