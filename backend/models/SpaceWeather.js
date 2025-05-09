import mongoose from 'mongoose';

const spaceWeatherSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  solarFlareIntensity: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  geomagneticStormLevel: {
    type: String,
    enum: ['None', 'Minor', 'Moderate', 'Strong', 'Severe'],
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
    required: true
  },
  prediction: {
    solarFlareProbability: Number,
    geomagneticStormProbability: Number,
    visibilityScore: Number
  }
}, {
  timestamps: true
});

export default mongoose.model('SpaceWeather', spaceWeatherSchema); 