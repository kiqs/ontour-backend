'use strict';

import router from './router';
import Like from '../models/Like';
import * as EventController from '../controllers/EventController';
import * as VenueController from '../controllers/VenueController';
import * as LikeController from '../controllers/LikeController';

router.get('/likes', async(ctx, next) => {
  try {
    let likes = await Like.find().populate('_event');
    ctx.body = likes;
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

    const venueRes = await VenueController.createVenue(event);
    const eventRes = await EventController.createEvent(venueRes._id, event);
    const likeRes = await LikeController.createLike(eventRes._id, event_id, user_id, like);
    ctx.body = {eventRes, venueRes, likeRes};
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
