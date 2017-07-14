'use strict';

import Event from '../models/Event';

export async function createEvent(event) {
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
