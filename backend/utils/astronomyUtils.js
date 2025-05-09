export const calculateMoonPhase = (date) => {
  // Calculate moon phase (0-100)
  const LUNAR_MONTH = 29.530588853; // days
  const KNOWN_NEW_MOON = new Date('2000-01-06T18:14:00Z');
  
  const diff = date - KNOWN_NEW_MOON;
  const days = diff / (1000 * 60 * 60 * 24);
  const phase = ((days % LUNAR_MONTH) / LUNAR_MONTH) * 100;
  
  return phase;
};

export const calculatePlanetaryPositions = (date) => {
  // Simplified planetary position calculation
  // In a real implementation, this would use proper astronomical algorithms
  const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
  const positions = {};
  
  planets.forEach(planet => {
    // Mock positions (replace with actual calculations)
    positions[planet] = {
      rightAscension: Math.random() * 360,
      declination: Math.random() * 180 - 90,
      magnitude: Math.random() * 5
    };
  });
  
  return positions;
};

export const calculateConjunction = (planet1, planet2, date) => {
  const positions = calculatePlanetaryPositions(date);
  const pos1 = positions[planet1];
  const pos2 = positions[planet2];
  
  if (!pos1 || !pos2) return null;
  
  // Calculate angular separation
  const separation = Math.sqrt(
    Math.pow(pos1.rightAscension - pos2.rightAscension, 2) +
    Math.pow(pos1.declination - pos2.declination, 2)
  );
  
  return {
    separation,
    isConjunction: separation < 5, // Consider it a conjunction if within 5 degrees
    planets: [planet1, planet2],
    date
  };
};

export const calculateMeteorShowerIntensity = (shower, date) => {
  // Simplified meteor shower intensity calculation
  // In a real implementation, this would use historical data and current conditions
  const peakDate = new Date(shower.peakDate);
  const daysFromPeak = Math.abs(date - peakDate) / (1000 * 60 * 60 * 24);
  
  // Base intensity decreases with distance from peak
  let intensity = shower.peakIntensity * Math.exp(-daysFromPeak / 3);
  
  // Adjust for moon phase
  const moonPhase = calculateMoonPhase(date);
  intensity *= (1 - (moonPhase / 100) * 0.5);
  
  return Math.max(0, Math.min(10, intensity));
}; 