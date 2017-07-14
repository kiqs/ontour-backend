'use strict';

import Like from '../../models/Like';
import Event from '../../models/Event';
import Venue from '../../models/Venue';
import router from '../router';

async function createEvent(event) {
  const eventRes = await Event.find({id: event.id});
  if (eventRes.length) return;

  const eventData = {
    id: event.id,
    name: event.displayName,
    location: event.location.city,
    lat: event.location.lat,
    lng: event.location.lng,
    start_date: event.start.date,
    type: event.type,
    uri: event.uri,
    venue_id: event.venue.id
  };

  let createEventRes = await Event.create(eventData);
  return createEventRes;
}

async function createVenue(event) {
  const { venue } = event;

  if (!venue.id) return;

  const venueRes = await Venue.find({id: venue.id});
  if (venueRes.length) return;

  const venueData = {
    id: venue.id,
    name: venue.displayName,
    country: venue.metroArea.country.displayName,
    city: venue.metroArea.displayName,
    state: venue.metroArea.state.displayName,
    uri: venue.uri
  };

  let createVenueRes = await Venue.create(venueData);
  return createVenueRes;
}

async function createLike(event_id, user_id, like) {
  const likeData = {
    event_id,
    user_id,
    like
  };

  let createLikeRes = await Like.create(likeData);
  return createLikeRes;
}

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

    await createEvent(event);
    await createVenue(event);
    ctx.body = await createLike(event_id, user_id, like);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
