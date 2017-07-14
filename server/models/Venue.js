'use strict';

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const VenueSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: true,
    unique: true
  },
  name: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  uri: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
});

VenueSchema.plugin(uniqueValidator);

export default mongoose.model('Venue', VenueSchema);
