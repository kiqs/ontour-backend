'use strict';

import Event from '../models/Event';

export async function createEvent(venue_id, event) {
  const eventRes = await Event.find({id: event.id});
  if (eventRes.length) return eventRes[0];

  const eventData = {
    _venue: venue_id,
    id: event.id,
    name: event.displayName,
    location: event.location.city,
    coords: [event.location.lng, event.location.lat],
    start_date: event.start.date,
    type: event.type,
    uri: event.uri,
    venue_id: event.venue.id
  };

  let createEventRes = await Event.create(eventData);
  return createEventRes;
}
