import mongoose from 'mongoose';

const celestialEventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: ['meteor_shower', 'planetary_alignment', 'conjunction', 'celestial_object']
  },
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  peakDate: {
    type: Date,
    required: true
  },
  intensity: {
    type: Number,
    min: 0,
    max: 10,
    default: 5
  },
  visibility: {
    type: Number,
    min: 0,
    max: 10,
    default: 5
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: String,
  prediction: {
    optimalViewingTimes: [{
      date: Date,
      score: Number,
      conditions: {
        moonPhase: Number,
        lightPollution: Number,
        cloudCover: Number
      }
    }],
    intensityForecast: {
      predicted: Number,
      confidence: Number
    }
  },
  metadata: {
    source: String,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Index for geospatial queries
celestialEventSchema.index({ location: '2dsphere' });

const CelestialEvent = mongoose.model('CelestialEvent', celestialEventSchema);

export default CelestialEvent; 