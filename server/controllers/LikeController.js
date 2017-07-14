'use strict';

import Like from '../models/Like';

export async function createLike(event_id, user_id, like) {
  const likeData = {
    event_id,
    user_id,
    like
  };

  let createLikeRes = await Like.create(likeData);
  return createLikeRes;
}

export async function addEventLikesInfo(results, resLikes) {
  let newEvents = await Promise.all(results.resultsPage.results.event.map(async event => {
    const likesCount = await Like.count({event_id: event.id});
    event.likesCount = likesCount;
    event.like = false;

    resLikes.forEach(like => {
      if (like.event_id == event.id) {
        event.like = true;
      }
    });

    return event;
  }));

  results.resultsPage.results.event = newEvents;
  return results;
}
