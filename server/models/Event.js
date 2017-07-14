'use strict';

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const EventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: true,
    unique: true
  },
  name: {
    type: String
  },
  location: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  start_date: {
    type: String
  },
  type: {
    type: String
  },
  uri: {
    type: String
  },
  venue_id: {
    type: Number
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
});

EventSchema.plugin(uniqueValidator);

export default mongoose.model('Event', EventSchema);
