import axios from 'axios';
import SpaceWeather from '../models/SpaceWeather.js';

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_BASE_URL = 'https://api.nasa.gov/DONKI';

// Fetch solar flare data
async function fetchSolarFlares() {
  try {
    const response = await axios.get(`${NASA_API_BASE_URL}/FLR`, {
      params: {
        api_key: NASA_API_KEY,
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching solar flare data:', error);
    return [];
  }
}

// Fetch geomagnetic storm data
async function fetchGeomagneticStorms() {
  try {
    const response = await axios.get(`${NASA_API_BASE_URL}/GST`, {
      params: {
        api_key: NASA_API_KEY,
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching geomagnetic storm data:', error);
    return [];
  }
}

// Calculate Kp index based on geomagnetic activity
function calculateKpIndex(geomagneticData) {
  if (!geomagneticData || geomagneticData.length === 0) return 2; // Default moderate activity
  
  const latestStorm = geomagneticData[0];
  const scale = latestStorm.scale || 'G1';
  const kpMap = {
    'G1': 5,
    'G2': 6,
    'G3': 7,
    'G4': 8,
    'G5': 9
  };
  
  return kpMap[scale] || 2;
}

// Calculate solar flare intensity
function calculateSolarFlareIntensity(solarFlares) {
  if (!solarFlares || solarFlares.length === 0) return 1; // Default low intensity
  
  const latestFlare = solarFlares[0];
  const classMap = {
    'A': 1,
    'B': 2,
    'C': 3,
    'M': 4,
    'X': 5
  };
  
  const flareClass = latestFlare.classType[0];
  return classMap[flareClass] || 1;
}

// Update space weather data
export async function updateSpaceWeatherData() {
  try {
    const [solarFlares, geomagneticStorms] = await Promise.all([
      fetchSolarFlares(),
      fetchGeomagneticStorms()
    ]);
    
    const kpIndex = calculateKpIndex(geomagneticStorms);
    const solarFlareIntensity = calculateSolarFlareIntensity(solarFlares);
    
    // Create new space weather record
    const spaceWeather = new SpaceWeather({
      date: new Date(),
      solarFlareIntensity,
      geomagneticStormLevel: geomagneticStorms[0]?.scale || 'G1',
      kpIndex,
      solarWindSpeed: 400, // Default value, would need additional API for real data
      prediction: {
        solarFlareProbability: 0.3,
        geomagneticStormProbability: 0.2,
        visibilityScore: 7
      }
    });
    
    await spaceWeather.save();
    return spaceWeather;
  } catch (error) {
    console.error('Error updating space weather data:', error);
    throw error;
  }
}

// Get latest space weather data
export async function getLatestSpaceWeather() {
  try {
    const latestData = await SpaceWeather.findOne()
      .sort({ date: -1 })
      .limit(1);
    
    if (!latestData) {
      // If no data exists, fetch and create new data
      return await updateSpaceWeatherData();
    }
    
    // Check if data is older than 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (latestData.date < oneHourAgo) {
      return await updateSpaceWeatherData();
    }
    
    return latestData;
  } catch (error) {
    console.error('Error getting latest space weather data:', error);
    throw error;
  }
} 