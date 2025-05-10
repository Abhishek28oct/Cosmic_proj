import mongoose from 'mongoose';

const spaceWeatherSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  solarFlareIntensity: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'M1', 'M2', 'M3', 'M4', 'M5', 'X1', 'X2', 'X3', 'X4', 'X5']
  },
  geomagneticStormLevel: {
    type: String,
    enum: ['G1', 'G2', 'G3', 'G4', 'G5', 'None'],
    required: true
  },
  kpIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 9
  },
  solarWindSpeed: {
    type: Number,
    required: true,
    min: 0
  },
  prediction: {
    solarFlareProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },
    geomagneticStormProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },
    visibilityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('SpaceWeather', spaceWeatherSchema); 