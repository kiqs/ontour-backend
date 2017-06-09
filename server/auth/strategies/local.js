'use strict';

import User from '../../models/User';
import { Strategy as LocalStrategy } from 'passport-local';

export default new LocalStrategy({
    nameField: 'name',
    usernameField: 'username',
    passwordField: 'password',
    session: false
  },
  function (email, password, done) {
    User.findOne({email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }
      return done(null, user);
    });
  }
);
