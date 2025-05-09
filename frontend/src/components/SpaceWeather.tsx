import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaCloud, FaExclamationTriangle } from 'react-icons/fa';

interface SpaceWeatherData {
  date: string;
  solarFlareIntensity: number;
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
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
        axios.get(`${API_BASE_URL}/space-weather/current`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }),
        axios.get(`${API_BASE_URL}/space-weather/forecast?days=7`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        })
      ]);
      
      console.log('Current weather response:', currentRes.data);
      console.log('Forecast response:', forecastRes.data);
      
      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      console.error('Error fetching space weather data:', err);
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNREFUSED') {
          setError('Cannot connect to the server. Please make sure the backend is running.');
        } else if (err.response?.status === 404) {
          setError('No space weather data available. Please try again later.');
        } else if (err.response?.status === 0) {
          setError('CORS error: Cannot access the server. Please check if the backend is running and CORS is properly configured.');
        } else {
          setError(err.response?.data?.message || 'Failed to fetch space weather data. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
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
    if (score >= 7) return <FaSun className="text-yellow-500" />;
    if (score >= 4) return <FaCloud className="text-gray-500" />;
    return <FaExclamationTriangle className="text-red-500" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading space weather data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Space Weather Data</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <FaCloud className="text-yellow-500 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-700 mb-2">No Data Available</h3>
          <p className="text-yellow-600">Space weather data is not currently available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Space Weather Forecast</h2>
      
      {/* Current Conditions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Current Conditions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Solar Flare Intensity</p>
            <p className="text-lg font-semibold">{currentWeather.solarFlareIntensity}/10</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Geomagnetic Storm</p>
            <p className="text-lg font-semibold">{currentWeather.geomagneticStormLevel}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Kp Index</p>
            <p className="text-lg font-semibold">{currentWeather.kpIndex}/9</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Solar Wind Speed</p>
            <p className="text-lg font-semibold">{currentWeather.solarWindSpeed} km/s</p>
          </div>
        </div>
      </div>

      {/* ML Predictions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">ML Predictions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Solar Flare Probability</p>
            <p className="text-lg font-semibold">
              {(currentWeather.prediction.solarFlareProbability * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Geomagnetic Storm Probability</p>
            <p className="text-lg font-semibold">
              {(currentWeather.prediction.geomagneticStormProbability * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Visibility Score</p>
            <p className="text-lg font-semibold flex items-center gap-2">
              {currentWeather.prediction.visibilityScore.toFixed(1)}/10
              {getVisibilityIcon(currentWeather.prediction.visibilityScore)}
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold">
                {new Date(day.date).toLocaleDateString()}
              </p>
              <div className="mt-2 space-y-2">
                <p className="text-sm">
                  Solar Flare: {((day.prediction?.solarFlareProbability || 0) * 100).toFixed(1)}%
                </p>
                <p className="text-sm">
                  Geomagnetic: {((day.prediction?.geomagneticStormProbability || 0) * 100).toFixed(1)}%
                </p>
                <p className="text-sm flex items-center gap-2">
                  Visibility: {(day.prediction?.visibilityScore || 0).toFixed(1)}/10
                  {getVisibilityIcon(day.prediction?.visibilityScore || 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 