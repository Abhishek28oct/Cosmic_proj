import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import articleRoutes from './routes/articles.js';
import isroRoutes from './routes/isro.js';
import blogRoutes from './routes/blogs.js';
import spaceWeatherRoutes from './routes/spaceWeather.js';
import SpaceWeather from './models/SpaceWeather.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'https://cosmichorizons.netlify.app',  // Updated Netlify domain
    'https://*.netlify.app'  // Allow all Netlify subdomains
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Initialize space weather data
const initializeSpaceWeather = async () => {
  try {
    await SpaceWeather.deleteMany({});
    const weather = new SpaceWeather({
      date: new Date(),
      solarFlareIntensity: 'M1',
      geomagneticStormLevel: 'G1',
      kpIndex: 3,
      solarWindSpeed: 400,
      prediction: {
        solarFlareProbability: 0.3,
        geomagneticStormProbability: 0.2,
        visibilityScore: 0.8
      }
    });
    await weather.save();
    console.log('Initial space weather data created');
  } catch (error) {
    console.error('Error initializing space weather data:', error);
  }
};

// Initialize data
initializeSpaceWeather();

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cosmic-horizons';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/isro', isroRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/space-weather', spaceWeatherRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port or kill the process using this port.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Received SIGINT. Performing graceful shutdown...');
  server.close(() => {
    console.log('Server closed. Exiting process...');
    process.exit(0);
  });
}); 