'use strict';

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const LikeSchema = new mongoose.Schema({
  _event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  event_id: String,
  user_id: String,
  like: Boolean
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
});

LikeSchema.plugin(uniqueValidator);

export default mongoose.model('Like', LikeSchema);
