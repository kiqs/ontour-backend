'use strict';

import User from '../../models/User';
import { Strategy as LocalStrategy } from 'passport-local';

export default new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
}, localCallback);

async function localCallback(username, password, done) {
  let usernameExists = await User.findOne({username: username});
  let emailExists = await User.findOne({email: username});

  if (!usernameExists && !emailExists) {
    return done('Invalid username or email');
  }

  if (usernameExists && !usernameExists.checkPassword(password)) {
    return done(null, false, {message: 'Invalid password'});
  }

  if (emailExists && !emailExists.checkPassword(password)) {
    return done(null, false, {message: 'Invalid password'});
  }

  return done(null, usernameExists || emailExists);
}
