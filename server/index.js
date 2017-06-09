'use strict';

import Koa from 'koa';

import middleware from './middleware';
import auth from './auth';
import routes from './routes';

const app = new Koa();

app.keys = ['secret'];

app.use(middleware());
app.use(auth());
app.use(routes);
app.use(ctx => ctx.status = 404);

export default app;

// const bodyParser = require('koa-bodyparser');
// const session = require('koa-session')
// const http = require('http');
// const config = require('./config/config');
// const passport = require('./config/passport');
// const err = require('./error');
// const { routes, allowedMethods } = require('./routes/routes');
// const securedRouter = require('./routes/secure-routes');

// app.use(bodyParser());
// app.use(session({}, app));
//
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(err);
// app.use(routes());
// app.use(allowedMethods());
// app.use(securedRouter.middleware());
//
// const server = http.createServer(app.callback()).listen(config.server.port, () => {
//     console.log('%s listening at port %d', config.app.name, config.server.port);
// });

// module.exports = {
//     closeServer() {
//         server.close();
//     }
// };
