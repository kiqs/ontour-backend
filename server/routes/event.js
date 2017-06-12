'use strict';

import Event from '../models/Event';
import router from './router';

router.post('/event', async(ctx, next) => {
  try {
    ctx.body = await Event.create(ctx.request.body);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
