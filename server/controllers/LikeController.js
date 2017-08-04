'use strict';

import Like from '../models/Like';

export async function createLike(event, event_id, user_id, like) {
  return await Like.create({_event: event, event_id: event_id, user_id, like});
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
