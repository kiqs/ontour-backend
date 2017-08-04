'use strict';

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const VenueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  city: String,
  state: String,
  uri: String,
  events: [{
    type: Number,
    ref: 'Event'
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
});

VenueSchema.plugin(uniqueValidator);

export default mongoose.model('Venue', VenueSchema);
