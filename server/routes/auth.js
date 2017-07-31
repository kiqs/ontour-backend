'use strict';

import {
  authEmail,
  generateToken,
} from '../auth';
import User from '../models/User';

export default (router) => {
  router
    .post('/auth/email',
      authEmail(),
      generateToken());

  router
    .post('/auth/register',
      register,
      generateToken(),
  );
};
