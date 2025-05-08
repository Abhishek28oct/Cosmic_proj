const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
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
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token with different expiration based on remember me
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? '30d' : '24h' } // 30 days if remember me is checked, 24 hours if not
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
    res.status(500).json({ message: 'Error logging in' });
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

// Google Sign In
router.post('/google', async (req, res) => {
  try {
    console.log('Received Google auth request:', req.body); // Debug log
    
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'No credential provided' });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    console.log('Google ticket:', ticket); // Debug log

    const payload = ticket.getPayload();
    console.log('Google payload:', payload); // Debug log

    const { email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        email,
        username: name,
        password: Math.random().toString(36).slice(-8), // Random password
        avatar: picture,
        isGoogleUser: true
      });
      await user.save();
      console.log('Created new user:', user); // Debug log
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google auth error:', error); // Debug log
    res.status(500).json({ 
      message: 'Error authenticating with Google',
      error: error.message 
    });
  }
});

// Apple Sign In
router.post('/apple', async (req, res) => {
  try {
    // Generate Apple Sign In URL
    const appleAuthUrl = `https://appleid.apple.com/auth/authorize?client_id=${process.env.APPLE_CLIENT_ID}&redirect_uri=${process.env.APPLE_REDIRECT_URI}&response_type=code id_token&scope=name email&response_mode=fragment`;
    
    res.json({ url: appleAuthUrl });
  } catch (error) {
    console.error('Apple auth error:', error);
    res.status(500).json({ message: 'Error initiating Apple sign in' });
  }
});

// Apple Sign In Callback
router.post('/apple/callback', async (req, res) => {
  try {
    const { code, id_token } = req.body;
    
    // Verify Apple token and get user info
    // This is a simplified version. You'll need to implement proper Apple token verification
    
    // Find or create user
    let user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      user = new User({
        email: req.body.email,
        username: req.body.name || req.body.email.split('@')[0],
        password: Math.random().toString(36).slice(-8),
        isAppleUser: true
      });
      await user.save();
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
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
    console.error('Apple callback error:', error);
    res.status(500).json({ message: 'Error completing Apple sign in' });
  }
});

module.exports = router; 