'use strict';

import User from '../models/User';

const ERROR_ALREADY_REGISTERED = {
  status: 'error',
  message: 'E-mail already registered'
};

export async function register(data) {
  const { username, email, password } = data;

  if (username && email && password) {
    let user = await User.findOne({email});

    if (!user) {
      user = await User.create({
        username,
        email,
        password
      });

      return user;
    } else {
      return ERROR_ALREADY_REGISTERED;
    }
  } else {
    return ERROR_ALREADY_REGISTERED;
  }
}
