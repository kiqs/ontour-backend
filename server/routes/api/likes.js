'use strict';

import Like from '../../models/Like';
import router from '../router';
import * as EventController from '../../controllers/EventController';
import * as VenueController from '../../controllers/VenueController';
import * as LikeController from '../../controllers/LikeController';

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
    const { event, event_id, user_id, like } = ctx.request.body;

    if (!like) {
      ctx.body = await Like.remove({event_id: event_id});
      return;
    }

    await EventController.createEvent(event);
    await VenueController.createVenue(event);
    ctx.body = await LikeController.createLike(event_id, user_id, like);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
