// Simple ML predictor using linear regression
function calculatePrediction(historicalData, daysToPredict) {
  const predictions = [];
  const latestData = historicalData[0];
  
  // Calculate trends from historical data
  const trends = calculateTrends(historicalData);
  
  // Generate predictions for each day
  for (let i = 0; i < daysToPredict; i++) {
    const date = new Date(latestData.date);
    date.setDate(date.getDate() + i + 1);
    
    // Calculate predictions using trends and latest data
    const solarFlareProb = predictValue(
      latestData.prediction.solarFlareProbability,
      trends.solarFlare,
      i + 1
    );
    
    const geomagneticProb = predictValue(
      latestData.prediction.geomagneticStormProbability,
      trends.geomagnetic,
      i + 1
    );
    
    const visibilityScore = predictValue(
      latestData.prediction.visibilityScore,
      trends.visibility,
      i + 1
    );
    
    predictions.push({
      date: date.toISOString(),
      prediction: {
        solarFlareProbability: Math.max(0, Math.min(1, solarFlareProb)),
        geomagneticStormProbability: Math.max(0, Math.min(1, geomagneticProb)),
        visibilityScore: Math.max(0, Math.min(10, visibilityScore))
      }
    });
  }
  
  return predictions;
}

// Calculate trends from historical data
function calculateTrends(historicalData) {
  const trends = {
    solarFlare: 0,
    geomagnetic: 0,
    visibility: 0
  };
  
  // Use last 7 days of data to calculate trends
  const recentData = historicalData.slice(0, 7);
  
  for (let i = 0; i < recentData.length - 1; i++) {
    const current = recentData[i];
    const next = recentData[i + 1];
    
    trends.solarFlare += (next.prediction.solarFlareProbability - current.prediction.solarFlareProbability);
    trends.geomagnetic += (next.prediction.geomagneticStormProbability - current.prediction.geomagneticStormProbability);
    trends.visibility += (next.prediction.visibilityScore - current.prediction.visibilityScore);
  }
  
  // Average the trends
  const divisor = recentData.length - 1;
  trends.solarFlare /= divisor;
  trends.geomagnetic /= divisor;
  trends.visibility /= divisor;
  
  return trends;
}

// Predict future value using linear regression
function predictValue(currentValue, trend, daysAhead) {
  return currentValue + (trend * daysAhead);
}

// Export the prediction function
export async function predictSpaceWeather(historicalData, daysToPredict) {
  return calculatePrediction(historicalData, daysToPredict);
} 