'use strict';

import router from './router';
import Like from '../models/Like';
import * as EventController from '../controllers/EventController';
import * as VenueController from '../controllers/VenueController';
import * as LikeController from '../controllers/LikeController';

router.get('/likes', async(ctx, next) => {
  try {
    let likes = await Like.find();
    let collectedLikes = await LikeController.collectLikesInfo(likes);
    ctx.body = collectedLikes;
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

    const eventRes = await EventController.createEvent(event);
    const venueRes = await VenueController.createVenue(event);
    const likeRes = await LikeController.createLike(event_id, user_id, like);
    ctx.body = {eventRes, venueRes, likeRes};
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
