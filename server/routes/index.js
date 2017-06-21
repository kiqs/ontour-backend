'use strict';

import compose from 'koa-compose';
import eventsRoutes from './events';
import usersRoutes from './users';
import artistsRoutes from './artists';
import releasesRoutes from './releases';

export default function routes() {
  return compose([usersRoutes, eventsRoutes, artistsRoutes, releasesRoutes]);
}
