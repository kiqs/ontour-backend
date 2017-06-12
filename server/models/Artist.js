'use strict';

import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  performers: {
    type: String,
    required: false,
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('Artist', ArtistSchema);
