'use strict';

import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import router from './router';

router.post('/user', async(ctx, next) => {
  try {
    ctx.body = await User.create(ctx.request.body);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/login', async(ctx, next) => {
  await passport.authenticate('local', function (err, user) {
    if (user == false) {
      ctx.body = "Login failed";
    } else {
      const payload = {
        id: user.id,
        displayName: user.displayName,
        email: user.email
      };

      const jwtsecret = 'DDA7374E3A7ECEFB0032BD710FDA42BD3556B7F0BC2C331D4F76281F99D4750E';
      const token = jwt.sign(payload, jwtsecret);

      ctx.body = {
        user: {
          name: user.name,
          username: user.username
        },
        token: 'JWT ' + token
      };
    }
  })(ctx, next);
});

router.get('/custom', async(ctx, next) => {
  await passport.authenticate('jwt', function (err, user) {
    if (user) {
      ctx.body = "hello " + user.displayName;
    } else {
      ctx.body = "No such user";
      console.log("err", err)
    }
  })(ctx, next);
});

export default router.routes();
