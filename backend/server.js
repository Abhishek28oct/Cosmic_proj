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
import celestialEventRoutes from './routes/celestialEvents.js';
import SpaceWeather from './models/SpaceWeather.js';
import CelestialEvent from './models/CelestialEvent.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
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
async function initializeSpaceWeather() {
  try {
    // Clear existing space weather data
    await SpaceWeather.deleteMany({});
    console.log('Cleared existing space weather data');
    
    // Create initial space weather record
    const initialWeather = new SpaceWeather({
      date: new Date(),
      solarFlareIntensity: 2,
      geomagneticStormLevel: 'None',
      kpIndex: 2,
      solarWindSpeed: 400,
      prediction: {
        solarFlareProbability: 0.2,
        geomagneticStormProbability: 0.1,
        visibilityScore: 8
      }
    });
    await initialWeather.save();
    console.log('Initial space weather data created');
  } catch (error) {
    console.error('Error initializing space weather data:', error);
  }
}

// Initialize celestial events data
async function initializeCelestialEvents() {
  try {
    // Clear existing events
    await CelestialEvent.deleteMany({});
    console.log('Cleared existing celestial events');
    
    // Create sample celestial events
    const sampleEvents = [
      {
        eventType: 'meteor_shower',
        name: 'Perseid Meteor Shower',
        startDate: new Date('2024-07-17'),
        endDate: new Date('2024-08-24'),
        peakDate: new Date('2024-08-12'),
        intensity: 8,
        visibility: 7,
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        description: 'One of the most popular meteor showers of the year, known for its bright and fast meteors.',
        prediction: {
          optimalViewingTimes: [
            {
              date: new Date('2024-08-12T02:00:00Z'),
              score: 8.5,
              conditions: {
                moonPhase: 15,
                lightPollution: 3,
                cloudCover: 20
              }
            }
          ],
          intensityForecast: {
            predicted: 8.2,
            confidence: 0.85
          }
        }
      },
      {
        eventType: 'planetary_alignment',
        name: 'Jupiter-Saturn Conjunction',
        startDate: new Date('2024-06-15'),
        endDate: new Date('2024-06-20'),
        peakDate: new Date('2024-06-17'),
        intensity: 6,
        visibility: 8,
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        description: 'A rare alignment of Jupiter and Saturn in the night sky.',
        prediction: {
          optimalViewingTimes: [
            {
              date: new Date('2024-06-17T20:00:00Z'),
              score: 9.0,
              conditions: {
                moonPhase: 5,
                lightPollution: 4,
                cloudCover: 10
              }
            }
          ],
          intensityForecast: {
            predicted: 6.5,
            confidence: 0.9
          }
        }
      },
      {
        eventType: 'meteor_shower',
        name: 'Geminid Meteor Shower',
        startDate: new Date('2024-12-04'),
        endDate: new Date('2024-12-17'),
        peakDate: new Date('2024-12-14'),
        intensity: 9,
        visibility: 8,
        location: {
          type: 'Point',
          coordinates: [0, 0]
        },
        description: 'One of the most reliable meteor showers, known for its bright and colorful meteors.',
        prediction: {
          optimalViewingTimes: [
            {
              date: new Date('2024-12-14T02:00:00Z'),
              score: 9.5,
              conditions: {
                moonPhase: 10,
                lightPollution: 3,
                cloudCover: 15
              }
            }
          ],
          intensityForecast: {
            predicted: 9.0,
            confidence: 0.95
          }
        }
      }
    ];

    const createdEvents = await CelestialEvent.insertMany(sampleEvents);
    console.log('Created celestial events:', createdEvents.length);
  } catch (error) {
    console.error('Error initializing celestial events:', error);
  }
}

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cosmic-horizons';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
    // Initialize data after successful connection
    await initializeSpaceWeather();
    await initializeCelestialEvents();
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
app.use('/api/celestial-events', celestialEventRoutes);

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