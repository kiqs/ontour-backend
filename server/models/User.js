'use strict';

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  facebook_id: {
    type: String,
  },
  twitter_id: {
    type: String,
  },
  google_id: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('User', UserSchema);
