'use strict';

import Artist from '../models/Artist';
import router from './router';

router.post('/artists', async(ctx, next) => {
  try {
    ctx.body = await Artist.create(ctx.request.body);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
