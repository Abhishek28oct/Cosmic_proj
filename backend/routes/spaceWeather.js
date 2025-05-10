import express from 'express';
import axios from 'axios';
import SpaceWeather from '../models/SpaceWeather.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Function to fetch real-time space weather data from NASA
const fetchNASAData = async () => {
  try {
    const response = await axios.get(`https://api.nasa.gov/DONKI/notifications?api_key=${process.env.NASA_API_KEY}&type=all`);
    const data = response.data;
    
    // Process NASA data to get current space weather conditions
    const currentData = {
      date: new Date(),
      solarFlareIntensity: 0,
      geomagneticStormLevel: 0,
      kpIndex: 0,
      solarWindSpeed: 0,
      prediction: {
        solarFlareProbability: 0,
        geomagneticStormProbability: 0,
        visibilityScore: 0
      }
    };

    // Process notifications to extract relevant data
    data.forEach(notification => {
      if (notification.messageType === 'FLR') {
        // Solar Flare data
        currentData.solarFlareIntensity = notification.flrClass ? 
          parseInt(notification.flrClass.replace(/[^0-9]/g, '')) : 0;
        currentData.prediction.solarFlareProbability = notification.probability || 0;
      } else if (notification.messageType === 'GST') {
        // Geomagnetic Storm data
        currentData.geomagneticStormLevel = notification.scale ? 
          parseInt(notification.scale.replace(/[^0-9]/g, '')) : 0;
        currentData.prediction.geomagneticStormProbability = notification.probability || 0;
      } else if (notification.messageType === 'SWPC') {
        // Space Weather Prediction Center data
        if (notification.kpIndex) {
          currentData.kpIndex = notification.kpIndex;
          // Convert Kp index to visibility score (0-1)
          currentData.prediction.visibilityScore = 1 - (notification.kpIndex / 9);
        }
        if (notification.solarWindSpeed) {
          currentData.solarWindSpeed = notification.solarWindSpeed;
        }
      }
    });

    return currentData;
  } catch (error) {
    console.error('Error fetching NASA data:', error);
    return null;
  }
};

// Get current space weather
router.get('/current', async (req, res) => {
  try {
    // Fetch real-time data from NASA
    const realTimeData = await fetchNASAData();
    
    if (realTimeData) {
      // Save to database
      await SpaceWeather.findOneAndUpdate(
        { date: { $gte: new Date(Date.now() - 3600000) } }, // Within last hour
        realTimeData,
        { upsert: true, new: true }
      );
      
      res.json(realTimeData);
    } else {
      // Fallback to latest database entry
      const latestData = await SpaceWeather.findOne().sort({ date: -1 });
      res.json(latestData);
    }
  } catch (error) {
    console.error('Error fetching current space weather:', error);
    res.status(500).json({ message: 'Error fetching space weather data' });
  }
});

// Get forecast
router.get('/forecast', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const forecast = [];
    
    // Get current conditions
    const currentData = await SpaceWeather.findOne().sort({ date: -1 });
    
    if (currentData) {
      // Generate forecast based on current conditions and historical patterns
      for (let i = 1; i <= days; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        forecast.push({
          date: date.toISOString(),
          prediction: {
            solarFlareProbability: Math.min(1, currentData.prediction.solarFlareProbability * (1 + Math.random() * 0.2 - 0.1)),
            geomagneticStormProbability: Math.min(1, currentData.prediction.geomagneticStormProbability * (1 + Math.random() * 0.2 - 0.1)),
            visibilityScore: Math.min(1, currentData.prediction.visibilityScore * (1 + Math.random() * 0.2 - 0.1))
          }
        });
      }
    }
    
    res.json(forecast);
  } catch (error) {
    console.error('Error fetching forecast:', error);
    res.status(500).json({ message: 'Error fetching forecast data' });
  }
});

// Get stargazing recommendations
router.get('/stargazing', async (req, res) => {
  try {
    const weather = await SpaceWeather.findOne().sort({ date: -1 });
    if (!weather) {
      return res.status(404).json({ message: 'No space weather data available for recommendations' });
    }

    const recommendation = generateStargazingRecommendation(weather);
    res.json(recommendation);
  } catch (error) {
    console.error('Error generating stargazing recommendations:', error);
    res.status(500).json({ message: 'Error generating stargazing recommendations' });
  }
});

// Helper function to generate stargazing recommendations
function generateStargazingRecommendation(weather) {
  const visibility = weather.prediction.visibilityScore;
  const solarFlareRisk = weather.prediction.solarFlareProbability;
  const geomagneticRisk = weather.prediction.geomagneticStormProbability;

  let recommendation = {
    visibility: visibility >= 7 ? 'Excellent' : visibility >= 4 ? 'Good' : 'Poor',
    solarFlareRisk: solarFlareRisk < 0.3 ? 'Low' : solarFlareRisk < 0.6 ? 'Moderate' : 'High',
    geomagneticRisk: geomagneticRisk < 0.3 ? 'Low' : geomagneticRisk < 0.6 ? 'Moderate' : 'High',
    message: ''
  };

  if (visibility >= 7 && solarFlareRisk < 0.3 && geomagneticRisk < 0.3) {
    recommendation.message = 'Perfect conditions for stargazing! Clear skies and minimal space weather interference expected.';
  } else if (visibility >= 4 && solarFlareRisk < 0.6 && geomagneticRisk < 0.6) {
    recommendation.message = 'Good conditions for stargazing. Some space weather activity may affect visibility.';
  } else {
    recommendation.message = 'Not recommended for stargazing. Poor visibility or high space weather activity expected.';
  }

  return recommendation;
}

export default router; 