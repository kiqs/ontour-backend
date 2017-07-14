'use strict';

import router from '../router';
import Like from '../../models/Like';
import Event from '../../models/Event';
import Venue from '../../models/Venue';
import * as EventController from '../../controllers/EventController';
import * as VenueController from '../../controllers/VenueController';
import * as LikeController from '../../controllers/LikeController';

async function collectLikesInfo(likes) {
  let newLikes = await Promise.all(likes.map(async like => {
    let eventInfo = await Event.find({id: like.event_id});
    eventInfo = eventInfo[0];
    let venueInfo = await Venue.find({id: eventInfo.venue_id});
    venueInfo = venueInfo[0];
    like = {like, eventInfo, venueInfo};
    return like;
  }));
  return newLikes;
}

router.get('/likes', async(ctx, next) => {
  try {
    let likes = await Like.find();
    let collectedLikes = await collectLikesInfo(likes);
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
