'use strict';

import compose from 'koa-compose';
import eventRoutes from './event';
import userRoutes from './user';

export default function routes() {
  return compose([userRoutes, eventRoutes]);
}
