'use strict';

import Event from '../../models/Event';
import router from '../router';

router.get('/events', async(ctx, next) => {
  try {
    ctx.body = await Event.find();
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/events', async(ctx, next) => {
  try {
    ctx.body = await Event.create(ctx.request.body);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
