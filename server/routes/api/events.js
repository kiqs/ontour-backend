'use strict';

import superagent from 'superagent';
import Like from '../../models/Like';
import router from '../router';
import * as constants from '../../constants/api';

async function addEventLikesInfo(results, resLikes) {
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

router.post('/upcoming-events', async(ctx, next) => {
  try {
    const res = await superagent.get(ctx.request.body.link)
      .query({ min_date: ctx.request.body.min_date })
      .query({ max_date: ctx.request.body.max_date })
      .query({ apikey: constants.SK_KEY })
      .query({ page: ctx.request.body.page })
      .query({ per_page: ctx.request.body.per_page })
      .withCredentials();

    let results = JSON.parse(res.text);
    const resLikes = await Like.find({user_id: ctx.request.body.user_id, like: true});
    const newRes = await addEventLikesInfo(results, resLikes);
    ctx.body = newRes.resultsPage;
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
