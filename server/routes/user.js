'use strict';

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
      //--payload - информация которую мы храним в токене и можем из него получать
      const payload = {
        id: user.id,
        displayName: user.displayName,
        email: user.email
      };
      const token = jwt.sign(payload, jwtsecret); //здесь создается JWT

      ctx.body = {user: user.displayName, token: 'JWT ' + token};
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

// import importDir from 'import-dir';
//
// const routerConfigs = [{ folder: 'base', prefix: '' }, { folder: 'api', prefix: '/api' }];
//
// export default function routes() {
//   const composed = routerConfigs.reduce((prev, curr) => {
//     const routes = importDir('./' + curr.folder);
//     const router = new Router({
//       prefix: curr.prefix
//     });
//
//     Object.keys(routes).map(name => routes[name](router));
//
//     return [router.routes(), router.allowedMethods(), ...prev];
//   }, []);
//
//   return compose(composed);
// }
