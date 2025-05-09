import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Registration attempt:', { username, email }); // Debug log

    // Validate required fields
    if (!username || !email || !password) {
      console.log('Missing fields:', { username: !!username, email: !!email, password: !!password }); // Debug log
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    console.log('Existing user check:', existingUser ? 'Found' : 'Not found'); // Debug log
    
    if (existingUser) {
      const message = existingUser.email === email ? 'Email already exists' : 'Username already exists';
      console.log('User exists:', message); // Debug log
      return res.status(400).json({ message });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();
    console.log('User created successfully:', { username, email }); // Debug log

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error); // Debug log
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    console.log('Login attempt:', { email, rememberMe }); // Debug log

    // Find user
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No'); // Debug log
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch); // Debug log
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token with different expiration based on remember me
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: rememberMe ? '30d' : '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error); // Debug log
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

export default router; 