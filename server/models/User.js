'use strict';

import mongoose from 'mongoose';
import crypto from 'crypto';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: 'Please fill username',
    unique: 'User with this username already exists'
  },
  email: {
    type: String,
    required: 'Please fill email',
    unique: 'User with this email already exists'
  },
  passwordHash: {
    type: String,
    required: true,
  },
  salt: String,
  facebook_id: {
    type: String,
  },
  twitter_id: {
    type: String,
  },
  google_id: {
    type: String,
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('password').set(function (password) {
  this.salt = crypto.randomBytes(128).toString('base64');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
});

UserSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

export default mongoose.model('User', UserSchema);
