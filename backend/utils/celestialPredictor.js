import { calculateMoonPhase } from './astronomyUtils.js';

export const predictOptimalViewingTimes = async (event, location, days = 7) => {
  const optimalTimes = [];
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  // Generate predictions for each day
  for (let d = 0; d < days; d++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + d);
    
    if (currentDate > endDate) break;
    
    // Calculate viewing conditions
    const moonPhase = calculateMoonPhase(currentDate);
    const lightPollution = await getLightPollutionLevel(location);
    const cloudCover = await getCloudCover(location, currentDate);
    
    // Calculate viewing score (0-10)
    const score = calculateViewingScore({
      moonPhase,
      lightPollution,
      cloudCover,
      eventType: event.eventType
    });
    
    optimalTimes.push({
      date: currentDate,
      score,
      conditions: {
        moonPhase,
        lightPollution,
        cloudCover
      }
    });
  }
  
  // Sort by score in descending order
  return optimalTimes.sort((a, b) => b.score - a.score);
};

export const predictEventIntensity = async (event, historicalData) => {
  // Simple linear regression for intensity prediction
  const intensityTrend = calculateIntensityTrend(historicalData);
  const predictedIntensity = predictNextIntensity(intensityTrend, event);
  
  return {
    predicted: predictedIntensity,
    confidence: calculateConfidence(intensityTrend)
  };
};

// Helper functions
const calculateViewingScore = ({ moonPhase, lightPollution, cloudCover, eventType }) => {
  let score = 10;
  
  // Moon phase impact (0-3 points)
  score -= (moonPhase / 100) * 3;
  
  // Light pollution impact (0-3 points)
  score -= (lightPollution / 10) * 3;
  
  // Cloud cover impact (0-4 points)
  score -= (cloudCover / 100) * 4;
  
  // Event type specific adjustments
  if (eventType === 'meteor_shower') {
    // Meteor showers are more affected by moon phase
    score -= (moonPhase / 100) * 2;
  } else if (eventType === 'planetary_alignment') {
    // Planetary alignments are less affected by light pollution
    score += (lightPollution / 10);
  }
  
  return Math.max(0, Math.min(10, score));
};

const calculateIntensityTrend = (historicalData) => {
  if (!historicalData || historicalData.length < 2) {
    return { slope: 0, intercept: 5 };
  }
  
  const n = historicalData.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  
  historicalData.forEach((data, index) => {
    sumX += index;
    sumY += data.intensity;
    sumXY += index * data.intensity;
    sumX2 += index * index;
  });
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return { slope, intercept };
};

const predictNextIntensity = (trend, event) => {
  const nextIndex = event.historicalData ? event.historicalData.length : 0;
  return Math.max(0, Math.min(10, trend.slope * nextIndex + trend.intercept));
};

const calculateConfidence = (trend) => {
  // Simple confidence calculation based on trend stability
  const stability = Math.abs(trend.slope) < 0.1 ? 0.9 : 0.7;
  return stability;
};

// Mock functions for external data (replace with actual API calls)
const getLightPollutionLevel = async (location) => {
  // TODO: Implement actual light pollution API call
  return Math.random() * 10;
};

const getCloudCover = async (location, date) => {
  // TODO: Implement actual weather API call
  return Math.random() * 100;
}; 