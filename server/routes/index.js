'use strict';

import compose from 'koa-compose';
import eventsRoutes from './events';
import likesRoutes from './likes';
import usersRoutes from './users';
import artistsRoutes from './artists';
import releasesRoutes from './releases';

export default function routes() {
  return compose([usersRoutes, eventsRoutes, likesRoutes, artistsRoutes, releasesRoutes]);
}
