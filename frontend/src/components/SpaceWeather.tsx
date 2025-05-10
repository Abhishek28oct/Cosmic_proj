import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaCloud, FaExclamationTriangle, FaWind, FaBolt, FaChartLine } from 'react-icons/fa';

interface SpaceWeatherData {
  date: string;
  solarFlareIntensity: string;
  geomagneticStormLevel: string;
  kpIndex: number;
  solarWindSpeed: number;
  prediction: {
    solarFlareProbability: number;
    geomagneticStormProbability: number;
    visibilityScore: number;
  };
}

interface ForecastData {
  date: string;
  prediction: {
    solarFlareProbability: number;
    geomagneticStormProbability: number;
    visibilityScore: number;
  };
}

// Use environment variable for API URL with fallback
const API_BASE_URL = 'http://localhost:5000/api';

export const SpaceWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<SpaceWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching from:', `${API_BASE_URL}/space-weather/current`);
      
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/space-weather/current`),
        axios.get(`${API_BASE_URL}/space-weather/forecast?days=7`)
      ]);
      
      console.log('Current weather response:', currentRes.data);
      console.log('Forecast response:', forecastRes.data);
      
      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      console.error('Error fetching space weather data:', err);
      setError('Unable to fetch space weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3600000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  const getVisibilityIcon = (score: number) => {
    if (score >= 0.7) return <FaSun className="text-yellow-400" />;
    if (score >= 0.4) return <FaCloud className="text-blue-400" />;
    return <FaExclamationTriangle className="text-red-400" />;
  };

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 shadow-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-xl border border-red-700/50 shadow-lg">
        <p className="text-red-300 flex items-center">
          <FaExclamationTriangle className="mr-2" />
          {error}
        </p>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 shadow-lg">
        <p className="text-gray-300">No space weather data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <FaChartLine className="mr-2 text-purple-400" />
          Current Space Weather
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <FaBolt className="text-yellow-400 mr-2" />
              <h3 className="text-gray-400">Solar Flare</h3>
            </div>
            <p className="text-2xl font-semibold text-white">{currentWeather.solarFlareIntensity}</p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <FaExclamationTriangle className="text-red-400 mr-2" />
              <h3 className="text-gray-400">Storm Level</h3>
            </div>
            <p className="text-2xl font-semibold text-white">{currentWeather.geomagneticStormLevel}</p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <FaChartLine className="text-blue-400 mr-2" />
              <h3 className="text-gray-400">Kp Index</h3>
            </div>
            <p className="text-2xl font-semibold text-white">{currentWeather.kpIndex}</p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <FaWind className="text-green-400 mr-2" />
              <h3 className="text-gray-400">Solar Wind</h3>
            </div>
            <p className="text-2xl font-semibold text-white">{currentWeather.solarWindSpeed} km/s</p>
          </div>
        </div>
      </div>

      {/* Forecast Card */}
      {forecast.length > 0 && (
        <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <FaChartLine className="mr-2 text-purple-400" />
            7-Day Forecast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-400 mb-2">{new Date(day.date).toLocaleDateString()}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Solar Flare</span>
                    <span className="text-white">{day.prediction.solarFlareProbability * 100}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Storm Level</span>
                    <span className="text-white">{day.prediction.geomagneticStormProbability * 100}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Visibility</span>
                    <span className="text-white">{day.prediction.visibilityScore * 100}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 