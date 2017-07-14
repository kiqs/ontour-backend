'use strict';

import Venue from '../models/Venue';

export async function createVenue(event) {
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
