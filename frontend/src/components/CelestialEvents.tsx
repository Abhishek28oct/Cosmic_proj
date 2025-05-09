import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaMoon, FaCloud, FaSun } from 'react-icons/fa';

interface CelestialEvent {
  _id: string;
  eventType: 'meteor_shower' | 'planetary_alignment' | 'conjunction' | 'celestial_object';
  name: string;
  startDate: string;
  endDate: string;
  peakDate: string;
  intensity: number;
  visibility: number;
  description: string;
  prediction: {
    optimalViewingTimes: Array<{
      date: string;
      score: number;
      conditions: {
        moonPhase: number;
        lightPollution: number;
        cloudCover: number;
      };
    }>;
    intensityForecast: {
      predicted: number;
      confidence: number;
    };
  };
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const CelestialEvents = () => {
  const [events, setEvents] = useState<CelestialEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CelestialEvent | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [upcomingRes, meteorShowersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/celestial-events/upcoming`),
        axios.get(`${API_BASE_URL}/celestial-events/meteor-showers`)
      ]);
      
      const allEvents = [...upcomingRes.data, ...meteorShowersRes.data];
      setEvents(allEvents);
    } catch (err) {
      console.error('Error fetching celestial events:', err);
      setError('Failed to fetch celestial events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'meteor_shower':
        return <FaStar className="text-yellow-500" />;
      case 'planetary_alignment':
        return <FaSun className="text-orange-500" />;
      case 'conjunction':
        return <FaMoon className="text-blue-500" />;
      default:
        return <FaStar className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading celestial events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <FaCloud className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Events</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchEvents}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Celestial Events</h2>
      
      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {events.map(event => (
          <div 
            key={event._id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="flex items-center gap-3 mb-4">
              {getEventIcon(event.eventType)}
              <h3 className="text-xl font-semibold">{event.name}</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Type:</span> {event.eventType.replace('_', ' ')}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Start:</span> {formatDate(event.startDate)}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Peak:</span> {formatDate(event.peakDate)}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Intensity</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(event.intensity / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Visibility</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(event.visibility / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                {getEventIcon(selectedEvent.eventType)}
                <h3 className="text-2xl font-bold">{selectedEvent.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">{selectedEvent.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Event Details</h4>
                  <p>Start: {formatDate(selectedEvent.startDate)}</p>
                  <p>Peak: {formatDate(selectedEvent.peakDate)}</p>
                  <p>End: {formatDate(selectedEvent.endDate)}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Predictions</h4>
                  <p>Intensity: {selectedEvent.prediction.intensityForecast.predicted.toFixed(1)}/10</p>
                  <p>Confidence: {(selectedEvent.prediction.intensityForecast.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Optimal Viewing Times</h4>
                <div className="space-y-2">
                  {selectedEvent.prediction.optimalViewingTimes.map((time, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{formatDate(time.date)}</p>
                      <div className="flex items-center gap-2">
                        <span>Score: {time.score.toFixed(1)}/10</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(time.score / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>Moon Phase: {time.conditions.moonPhase.toFixed(0)}%</p>
                        <p>Light Pollution: {time.conditions.lightPollution.toFixed(1)}/10</p>
                        <p>Cloud Cover: {time.conditions.cloudCover.toFixed(0)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 