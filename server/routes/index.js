'use strict';

import compose from 'koa-compose';
import eventsRoutes from './api/events';
import usersRoutes from './api/users';
import artistsRoutes from './api/artists';
import releasesRoutes from './api/releases';

export default function routes() {
  return compose([usersRoutes, eventsRoutes, artistsRoutes, releasesRoutes]);
}
