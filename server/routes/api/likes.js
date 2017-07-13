'use strict';

import Like from '../../models/Like';
import router from '../router';

router.get('/likes', async(ctx, next) => {
  try {
    ctx.body = await Like.find();
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/likes', async(ctx, next) => {
  try {
    if (!ctx.request.body.like) {
      ctx.body = await Like.remove({event_id: ctx.request.body.event_id});
      return;
    }

    ctx.body = await Like.create(ctx.request.body);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
