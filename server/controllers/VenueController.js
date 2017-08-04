'use strict';

import Venue from '../models/Venue';

export async function createVenue(event) {
  const { venue } = event;
  if (!venue.id) return;
  const venueRes = await Venue.find({id: venue.id});
  if (venueRes.length) return venueRes[0];
  const { metroArea } = venue;

  const venueData = {
    id: venue.id,
    name: venue.displayName,
    country: metroArea.country ? metroArea.country.displayName : null,
    city: metroArea.displayName,
    state: metroArea.state ? metroArea.state.displayName : null,
    uri: venue.uri
  };

  let createVenueRes = await Venue.create(venueData);
  return createVenueRes;
}
