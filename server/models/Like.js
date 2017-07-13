'use strict';

import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  event_id: {
    type: Number,
    required: true,
    index: true
  },
  user_id: {
    type: String,
    required: true,
    index: true
  },
  like: {
    type: Boolean,
    required: true,
    index: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
});

export default mongoose.model('Like', LikeSchema);
