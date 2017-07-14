'use strict';

import Like from '../models/Like';
import Event from '../models/Event';
import Venue from '../models/Venue';

export async function createLike(event_id, user_id, like) {
  return await Like.create({event_id, user_id, like});
}

export async function addEventLikesInfo(results, resLikes) {
  results.resultsPage.results.event = await Promise.all(results.resultsPage.results.event.map(async event => {
    event.likesCount = await Like.count({event_id: event.id});
    event.like = false;

    resLikes.forEach(like => {
      if (like.event_id == event.id) {
        event.like = true;
      }
    });

    return event;
  }));

  return results;
}

export async function collectLikesInfo(likes) {
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
