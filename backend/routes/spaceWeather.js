import express from 'express';
import SpaceWeather from '../models/SpaceWeather.js';
import { predictSpaceWeather } from '../utils/spaceWeatherPredictor.js';

const router = express.Router();

// Get current space weather
router.get('/current', async (req, res) => {
  try {
    const weather = await SpaceWeather.findOne().sort({ date: -1 });
    if (!weather) {
      return res.status(404).json({ message: 'No space weather data available' });
    }
    res.json(weather);
  } catch (error) {
    console.error('Error fetching current space weather:', error);
    res.status(500).json({ message: 'Error fetching space weather data' });
  }
});

// Get space weather forecast
router.get('/forecast', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const historicalData = await SpaceWeather.find()
      .sort({ date: -1 })
      .limit(30)
      .lean();

    if (historicalData.length === 0) {
      return res.status(404).json({ message: 'No historical data available for forecasting' });
    }

    const forecast = await predictSpaceWeather(historicalData, days);
    res.json(forecast);
  } catch (error) {
    console.error('Error generating forecast:', error);
    res.status(500).json({ message: 'Error generating space weather forecast' });
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