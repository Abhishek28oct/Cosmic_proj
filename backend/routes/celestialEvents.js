import express from 'express';
import CelestialEvent from '../models/CelestialEvent.js';
import { predictOptimalViewingTimes, predictEventIntensity } from '../utils/celestialPredictor.js';
import { calculateConjunction, calculateMeteorShowerIntensity } from '../utils/astronomyUtils.js';

const router = express.Router();

// Get all upcoming celestial events
router.get('/upcoming', async (req, res) => {
  try {
    console.log('Fetching upcoming celestial events...');
    const events = await CelestialEvent.find({
      endDate: { $gte: new Date() }
    }).sort({ startDate: 1 });
    
    console.log(`Found ${events.length} upcoming events`);
    res.json(events);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get optimal viewing times for an event
router.get('/:id/viewing-times', async (req, res) => {
  try {
    const event = await CelestialEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const location = req.query.location ? 
      JSON.parse(req.query.location) : 
      { type: 'Point', coordinates: [0, 0] };
    
    const days = parseInt(req.query.days) || 7;
    
    const optimalTimes = await predictOptimalViewingTimes(event, location, days);
    res.json(optimalTimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get meteor shower predictions
router.get('/meteor-showers', async (req, res) => {
  try {
    console.log('Fetching meteor showers...');
    const showers = await CelestialEvent.find({
      eventType: 'meteor_shower',
      endDate: { $gte: new Date() }
    });
    
    console.log(`Found ${showers.length} meteor showers`);
    const predictions = showers.map(shower => ({
      ...shower.toObject(),
      currentIntensity: calculateMeteorShowerIntensity(shower, new Date())
    }));
    
    res.json(predictions);
  } catch (error) {
    console.error('Error fetching meteor showers:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get planetary conjunctions
router.get('/conjunctions', async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
    const conjunctions = [];
    
    // Check for conjunctions between all planet pairs
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const conjunction = calculateConjunction(planets[i], planets[j], date);
        if (conjunction && conjunction.isConjunction) {
          conjunctions.push(conjunction);
        }
      }
    }
    
    res.json(conjunctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get event intensity predictions
router.get('/:id/intensity', async (req, res) => {
  try {
    const event = await CelestialEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const historicalData = await CelestialEvent.find({
      eventType: event.eventType,
      endDate: { $lt: new Date() }
    }).sort({ endDate: -1 }).limit(10);
    
    const prediction = await predictEventIntensity(event, historicalData);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 