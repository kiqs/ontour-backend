'use strict';

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const EventSchema = new mongoose.Schema({
  _venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  },
  id: Number,
  name: String,
  location: String,
  coords: [Number],
  start_date: String,
  type: String,
  uri: String,
  venue_id: Number,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
});

EventSchema.plugin(uniqueValidator);

export default mongoose.model('Event', EventSchema);
