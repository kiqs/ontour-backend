'use strict';

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const LikeSchema = new mongoose.Schema({
  _creator: {
    type: Number,
    ref: 'User'
  },
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
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
});

LikeSchema.plugin(uniqueValidator);

export default mongoose.model('Like', LikeSchema);
